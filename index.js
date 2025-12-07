// index.js - Version adaptée pour votre structure
document.addEventListener('DOMContentLoaded', function() {
  // Vérifier que APP_DATA existe
  if (!window.APP_DATA) {
    console.error('APP_DATA non trouvé. Vérifiez que data.js est chargé.');
    return;
  }

  // Initialiser Marzipano
  var panoElement = document.getElementById('pano');
  var viewerOpts = {
    controls: {
      mouseViewMode: APP_DATA.settings.mouseViewMode || 'drag'
    }
  };
  
  var viewer = new Marzipano.Viewer(panoElement, viewerOpts);
  var scenes = {};
  var sceneList = document.querySelector('.scenes');
  
  // Fonction pour créer une scène
  function createScene(sceneData) {
    var urlPrefix = "tiles";
    var source = Marzipano.ImageUrlSource.fromString(
      sceneData.image.base,
      { cubeMapPreviewUrl: urlPrefix + "/" + sceneData.id + "/preview.jpg" }
    );
    
    var geometry = new Marzipano.CubeGeometry(sceneData.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(
      sceneData.faceSize,
      (100 * Math.PI) / 180,
      (120 * Math.PI) / 180
    );
    
    var view = new Marzipano.RectilinearView(
      sceneData.initialViewParameters,
      limiter
    );
    
    var scene = viewer.createScene({
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
  
  // Gestionnaire de changement de scène
  function switchScene(sceneId) {
    var scene = scenes[sceneId];
    if (!scene) {
      console.error('Scène non trouvée:', sceneId);
      return;
    }
    
    // Mettre à jour le titre
    var sceneNameElement = document.querySelector('.sceneName');
    if (sceneNameElement) {
      sceneNameElement.textContent = scene.data.name;
    }
    
    // Activer le lien dans la liste
    var sceneLinks = document.querySelectorAll('.scene');
    sceneLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('data-id') === sceneId) {
        link.classList.add('active');
      }
    });
    
    // Changer de scène
    scene.scene.switchTo();
    
    // Mettre à jour les hotspots
    updateHotspots(scene.data);
  }
  
  // Mettre à jour les hotspots
  function updateHotspots(sceneData) {
    // Supprimer les anciens hotspots
    var hotspotContainer = document.getElementById('hotspotContainer');
    if (hotspotContainer) {
      hotspotContainer.remove();
    }
    
    hotspotContainer = document.createElement('div');
    hotspotContainer.id = 'hotspotContainer';
    hotspotContainer.style.position = 'absolute';
    hotspotContainer.style.width = '100%';
    hotspotContainer.style.height = '100%';
    hotspotContainer.style.pointerEvents = 'none';
    panoElement.appendChild(hotspotContainer);
    
    // Ajouter les link hotspots
    sceneData.linkHotspots.forEach(function(hotspot) {
      var element = document.createElement('div');
      element.className = 'hotspot link-hotspot';
      element.style.position = 'absolute';
      element.style.width = '40px';
      element.style.height = '40px';
      element.style.background = 'rgba(255, 255, 255, 0.7)';
      element.style.borderRadius = '50%';
      element.style.cursor = 'pointer';
      element.style.pointerEvents = 'auto';
      element.style.display = 'flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
      element.style.fontSize = '20px';
      element.style.color = '#333';
      element.textContent = '→';
      element.title = 'Aller vers ' + (scenes[hotspot.target] ? scenes[hotspot.target].data.name : hotspot.target);
      
      element.addEventListener('click', function() {
        switchScene(hotspot.target);
      });
      
      // Positionner le hotspot
      var coordinates = viewer.view().coordinatesFromYawPitch(
        hotspot.yaw,
        hotspot.pitch
      );
      
      element.style.left = (coordinates.x * 100) + '%';
      element.style.top = (coordinates.y * 100) + '%';
      element.style.transform = 'translate(-50%, -50%)';
      
      hotspotContainer.appendChild(element);
    });
    
    // Ajouter les info hotspots
    sceneData.infoHotspots.forEach(function(hotspot) {
      var element = document.createElement('div');
      element.className = 'hotspot info-hotspot';
      element.style.position = 'absolute';
      element.style.width = '30px';
      element.style.height = '30px';
      element.style.background = 'rgba(0, 150, 255, 0.7)';
      element.style.borderRadius = '50%';
      element.style.cursor = 'pointer';
      element.style.pointerEvents = 'auto';
      element.style.display = 'flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
      element.style.fontSize = '16px';
      element.style.color = 'white';
      element.textContent = 'i';
      element.title = hotspot.title || 'Information';
      
      // Info tooltip
      var tooltip = document.createElement('div');
      tooltip.className = 'hotspot-tooltip';
      tooltip.style.display = 'none';
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'rgba(0,0,0,0.8)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.maxWidth = '200px';
      tooltip.style.zIndex = '1000';
      tooltip.innerHTML = '<strong>' + (hotspot.title || 'Information') + '</strong><br>' + (hotspot.text || '');
      
      element.appendChild(tooltip);
      
      element.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
      });
      
      element.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
      });
      
      // Positionner le hotspot
      var coordinates = viewer.view().coordinatesFromYawPitch(
        hotspot.yaw,
        hotspot.pitch
      );
      
      element.style.left = (coordinates.x * 100) + '%';
      element.style.top = (coordinates.y * 100) + '%';
      element.style.transform = 'translate(-50%, -50%)';
      
      hotspotContainer.appendChild(element);
    });
  }
  
  // Configuration des boutons de contrôle
  function setupControls() {
    // Rotation automatique
    var autorotateToggle = document.getElementById('autorotateToggle');
    if (autorotateToggle && APP_DATA.settings.autorotateEnabled) {
      var isAutorotateEnabled = false;
      
      autorotateToggle.addEventListener('click', function() {
        isAutorotateEnabled = !isAutorotateEnabled;
        viewer.setIdleMovement(3000, isAutorotateEnabled);
        
        var icons = this.querySelectorAll('.icon');
        icons.forEach(function(icon) {
          icon.style.display = 'none';
        });
        
        if (isAutorotateEnabled) {
          this.querySelector('.on').style.display = 'block';
        } else {
          this.querySelector('.off').style.display = 'block';
        }
      });
      
      // Démarrer automatiquement si configuré
      if (APP_DATA.settings.autorotateEnabled) {
        setTimeout(function() {
          autorotateToggle.click();
        }, 1000);
      }
    }
    
    // Plein écran
    var fullscreenToggle = document.getElementById('fullscreenToggle');
    if (fullscreenToggle && APP_DATA.settings.fullscreenButton) {
      fullscreenToggle.addEventListener('click', function() {
        if (screenfull.isEnabled) {
          screenfull.toggle(panoElement);
        }
      });
      
      if (screenfull.isEnabled) {
        screenfull.on('change', function() {
          var icons = fullscreenToggle.querySelectorAll('.icon');
          icons.forEach(function(icon) {
            icon.style.display = 'none';
          });
          
          if (screenfull.isFullscreen) {
            fullscreenToggle.querySelector('.on').style.display = 'block';
          } else {
            fullscreenToggle.querySelector('.off').style.display = 'block';
          }
        });
      } else {
        fullscreenToggle.style.display = 'none';
      }
    } else if (fullscreenToggle) {
      fullscreenToggle.style.display = 'none';
    }
    
    // Liste des scènes
    var sceneListToggle = document.getElementById('sceneListToggle');
    if (sceneListToggle) {
      sceneListToggle.addEventListener('click', function() {
        var sceneList = document.getElementById('sceneList');
        sceneList.classList.toggle('expanded');
        
        var icons = this.querySelectorAll('.icon');
        icons.forEach(function(icon) {
          icon.style.display = 'none';
        });
        
        if (sceneList.classList.contains('expanded')) {
          this.querySelector('.on').style.display = 'block';
        } else {
          this.querySelector('.off').style.display = 'block';
        }
      });
    }
    
    // Boutons de contrôle de vue
    if (APP_DATA.settings.viewControlButtons) {
      var viewButtons = {
        viewUp: { yaw: 0, pitch: -0.1 },
        viewDown: { yaw: 0, pitch: 0.1 },
        viewLeft: { yaw: -0.1, pitch: 0 },
        viewRight: { yaw: 0.1, pitch: 0 },
        viewIn: { fov: -0.1 },
        viewOut: { fov: 0.1 }
      };
      
      Object.keys(viewButtons).forEach(function(buttonId) {
        var button = document.getElementById(buttonId);
        if (button) {
          button.addEventListener('click', function() {
            var view = viewer.view();
            var update = viewButtons[buttonId];
            var newParams = {};
            
            if (update.yaw !== undefined) {
              newParams.yaw = view.yaw() + update.yaw;
            }
            if (update.pitch !== undefined) {
              newParams.pitch = view.pitch() + update.pitch;
            }
            if (update.fov !== undefined) {
              newParams.fov = view.fov() + update.fov;
            }
            
            view.setParameters(newParams);
          });
        }
      });
    } else {
      // Cacher les boutons de contrôle de vue
      var viewControls = document.querySelectorAll('.viewControlButton');
      viewControls.forEach(function(button) {
        button.style.display = 'none';
      });
    }
  }
  
  // Initialiser les événements des scènes
  function setupSceneEvents() {
    var sceneLinks = document.querySelectorAll('.scene');
    sceneLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var sceneId = this.getAttribute('data-id');
        switchScene(sceneId);
      });
    });
  }
  
  // Démarrer
  setupControls();
  setupSceneEvents();
  
  // Charger la première scène
  if (APP_DATA.scenes.length > 0) {
    switchScene(APP_DATA.scenes[0].id);
  }
  
  // Exposer l'API
  window.viewer = viewer;
  window.switchScene = switchScene;
});
