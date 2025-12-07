// index.js - VERSION SIMPLIFIÉE À 100%
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DÉMARRAGE MARZIPANO');
    
    if (!window.APP_DATA) {
        alert('ERREUR: data.js non chargé!');
        return;
    }
    
    // 1. Créer le viewer
    const viewer = new Marzipano.Viewer(document.getElementById('pano'));
    
    // 2. Fonction pour créer une scène TRÈS SIMPLE
    function createSimpleScene(sceneData) {
        console.log(`Création scène: ${sceneData.name}`);
        
        // Afficher le chemin utilisé
        console.log('Chemin image:', sceneData.image.base);
        
        // Créer la source - FORCER le bon chemin
        const source = Marzipano.ImageUrlSource.fromString(
            sceneData.image.base,
            { 
                cubeMapPreviewUrl: "img/preview.jpg",
                // Forcer le rechargement
                retryDelay: 1000,
                maxRetries: 3
            }
        );
        
        // Géométrie simple
        const geometry = new Marzipano.CubeGeometry([
            { tileSize: 256, size: 256, fallbackOnly: true },
            { tileSize: 512, size: 512 },
            { tileSize: 512, size: 1024 }
        ]);
        
        // Vue simple
        const view = new Marzipano.RectilinearView({
            yaw: 0,
            pitch: 0,
            fov: Math.PI/2
        });
        
        // Créer la scène
        return viewer.createScene({
            source: source,
            geometry: geometry,
            view: view,
            pinFirstLevel: true
        });
    }
    
    // 3. Créer et afficher la première scène IMMÉDIATEMENT
    const firstScene = APP_DATA.scenes[0];
    const scene = createSimpleScene(firstScene);
    
    // Afficher tout de suite
    scene.switchTo({
        transitionDuration: 0 // Pas de transition
    });
    
    console.log('✅ Scène affichée:', firstScene.name);
    
    // 4. Gestion simple du menu
    document.querySelectorAll('.scene').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sceneId = this.getAttribute('data-id');
            const sceneData = APP_DATA.scenes.find(s => s.id === sceneId);
            
            if (sceneData) {
                const newScene = createSimpleScene(sceneData);
                newScene.switchTo({ transitionDuration: 1000 });
                console.log('Changement vers:', sceneData.name);
                
                // Mettre à jour le titre
                document.querySelector('.sceneName').textContent = sceneData.name;
                
                // Mettre en surbrillance
                document.querySelectorAll('.scene').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 5. Forcer l'affichage du titre
    document.querySelector('.sceneName').textContent = firstScene.name;
    document.querySelector('.scene[data-id="' + firstScene.id + '"]').classList.add('active');
    
    // 6. Exposer pour débogage
    window.viewer = viewer;
    window.currentScene = scene;
    
    console.log('✅ Marzipano prêt');
});
