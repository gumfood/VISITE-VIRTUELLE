// index.js - Version avec mapping personnalisé
document.addEventListener('DOMContentLoaded', function() {
  if (!window.APP_DATA) {
    console.error('APP_DATA non trouvé');
    return;
  }

  // MAPPING PERSONNALISÉ POUR LES FACES
  const faceMapping = {
    'bureau-1': {
      'f': '1',  // front -> 1
      'r': '3',  // right -> 3  
      'l': '5',  // left -> 5
      // l, r, u restent identiques
    }
  };

  // Fonction pour obtenir le nom de dossier réel
  function getActualFace(sceneId, face) {
    if (faceMapping[sceneId] && faceMapping[sceneId][face]) {
      return faceMapping[sceneId][face];
    }
    return face;
  }

  var panoElement = document.getElementById('pano');
  var viewer = new Marzipano.Viewer(panoElement);
  var scenes = {};

  // Source d'image personnalisée
  function createCustomImageSource(sceneData) {
    const sceneId = sceneData.id.split('-').slice(1).join('-'); // "0-bureau-1" -> "bureau-1"
    
    return {
      // Fonction appelée par Marzipano pour obtenir l'URL d'une tile
      url: function(face, level, x, y) {
        const actualFace = getActualFace(sceneId, face);
        const basePath = sceneData.image.base
          .replace('{z}', level)
          .replace('{f}', actualFace)
          .replace('{y}', y)
          .replace('{x}', x);
        
        console.log('Loading tile:', basePath); // Pour le débogage
        return basePath;
      },
      
      // Métadonnées
      tileSize: function(level) {
        return sceneData.levels[level].tileSize;
      },
      
      levelSize: function(level) {
        return sceneData.levels[level].size;
      },
      
      faceSize: sceneData.faceSize,
      fallbackLevels: sceneData.levels.filter(l => l.fallbackOnly).map((_, i) => i)
    };
  }

  // Créer une scène
  function createScene(sceneData) {
    const sceneId = sceneData.id.split('-').slice(1).join('-');
    
    // Source personnalisée
    const source = new Marzipano.ImageUrlSourceFromCustom(createCustomImageSource(sceneData));
    
    // Géométrie
    const geometry = new Marzipano.CubeGeometry(sceneData.levels);
    
    // Vue
    const limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );
    
    const view = new Marzipano.RectilinearView(
      sceneData.initialViewParameters,
      limiter
    );
    
    // Créer la scène
    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true
    });
    
    return {
      data: sceneData,
      scene: scene
    };
  }

  // Créer toutes les scènes
  APP_DATA.scenes.forEach(function(sceneData) {
    scenes[sceneData.id] = createScene(sceneData);
  });

  // Fonction pour basculer entre scènes
  function switchScene(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;

    // Mettre à jour le titre
    document.querySelector('.sceneName').textContent = scene.data.name;

    // Mettre en surbrillance dans la liste
    document.querySelectorAll('.scene').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-id') === sceneId);
    });

    // Basculer vers la scène
    scene.scene.switchTo();

    // Mettre à jour les hotspots
    updateHotspots(scene.data);
  }

  // Gérer les hotspots
  function updateHotspots(sceneData) {
    // Nettoyer les anciens hotspots
    const oldContainer = document.getElementById('hotspot-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.id = 'hotspot-container';
    container.style.cssText = `
      position: absolute; width: 100%; height: 100%; 
      pointer-events: none; z-index: 1000;
    `;
    panoElement.appendChild(container);

    // Hotspots de lien
    sceneData.linkHotspots.forEach(hotspot => {
      const el = document.createElement('div');
      el.className = 'hotspot link-hotspot';
      el.title = `Aller à ${scenes[hotspot.target]?.data.name || hotspot.target}`;
      el.innerHTML = '➤';
      el.style.cssText = `
        position: absolute; width: 40px; height: 40px;
        background: rgba(255,255,255,0.8); border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; pointer-events: auto;
        font-size: 20px; color: #333; transform: translate(-50%, -50%);
        transition: all 0.2s;
      `;

      el.addEventListener('click', () => switchScene(hotspot.target));
      el.addEventListener('mouseenter', () => {
        el.style.background = 'rgba(0,200,100,0.9)';
        el.style.transform = 'translate(-50%, -50%) scale(1.2)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.background = 'rgba(255,255,255,0.8)';
        el.style.transform = 'translate(-50%, -50%) scale(1)';
      });

      const coords = viewer.view().coordinatesFromYawPitch(hotspot.yaw, hotspot.pitch);
      el.style.left = (coords.x * 100) + '%';
      el.style.top = (coords.y * 100) + '%';

      container.appendChild(el);
    });
  }

  // Initialiser les événements
  function initEvents() {
    // Liens des scènes
    document.querySelectorAll('.scene').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchScene(link.getAttribute('data-id'));
      });
    });

    // Rotation automatique
    const autorotateBtn = document.getElementById('autorotateToggle');
    if (autorotateBtn) {
      let autorotating = false;
      autorotateBtn.addEventListener('click', () => {
        autorotating = !autorotating;
        viewer.setIdleMovement(3000, autorotating);
        autorotateBtn.querySelector('.on').style.display = autorotating ? 'block' : 'none';
        autorotateBtn.querySelector('.off').style.display = autorotating ? 'none' : 'block';
      });
    }

    // Plein écran
    const fullscreenBtn = document.getElementById('fullscreenToggle');
    if (fullscreenBtn && screenfull.isEnabled) {
      fullscreenBtn.addEventListener('click', () => screenfull.toggle(panoElement));
      screenfull.on('change', () => {
        fullscreenBtn.querySelector('.on').style.display = screenfull.isFullscreen ? 'block' : 'none';
        fullscreenBtn.querySelector('.off').style.display = screenfull.isFullscreen ? 'none' : 'block';
      });
    }

    // Contrôles de vue
    const viewControls = {
      viewUp: { pitch: -0.1 },
      viewDown: { pitch: 0.1 },
      viewLeft: { yaw: -0.1 },
      viewRight: { yaw: 0.1 },
      viewIn: { fov: -0.1 },
      viewOut: { fov: 0.1 }
    };

    Object.keys(viewControls).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener('click', () => {
          const view = viewer.view();
          const update = viewControls[id];
          const params = {};
          
          if (update.yaw !== undefined) params.yaw = view.yaw() + update.yaw;
          if (update.pitch !== undefined) params.pitch = view.pitch() + update.pitch;
          if (update.fov !== undefined) params.fov = view.fov() + update.fov;
          
          view.setParameters(params);
        });
      }
    });
  }

  // Démarrer
  initEvents();
  if (APP_DATA.scenes.length > 0) {
    switchScene(APP_DATA.scenes[0].id);
  }

  // Outil de débogage
  window.debugScene = function(sceneId) {
    const scene = scenes[sceneId];
    if (!scene) return;
    
    console.log('=== DEBUG SCENE ===');
    console.log('Scene:', sceneId);
    console.log('Expected faces: b, d, f, l, r, u');
    
    // Tester chaque face
    ['b', 'd', 'f', 'l', 'r', 'u'].forEach(face => {
      const testUrl = scene.data.image.base
        .replace('{z}', '1')
        .replace('{f}', face)
        .replace('{y}', '0')
        .replace('{x}', '0');
      
      console.log(`Testing ${face}: ${testUrl}`);
      
      // Vérifier si le fichier existe
      fetch(testUrl, { method: 'HEAD' })
        .then(response => {
          console.log(`  ${face}: ${response.status === 200 ? '✅ OK' : '❌ Missing'}`);
        })
        .catch(() => {
          console.log(`  ${face}: ❌ Error`);
        });
    });
  };
});
