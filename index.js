'use strict';

(function() {
  var Marzipano = window.Marzipano;
  var bowser = window.bowser;
  var screenfull = window.screenfull;

  // Exemple de données de test
  var data = {
    settings: {
      mouseViewMode: "drag",
      autorotateEnabled: true,
      fullscreenButton: true
    },
    scenes: [
      {
        id: "scene1",
        name: "Salon",
        initialViewParameters: { yaw: 0, pitch: 0, fov: Math.PI/2 },
        levels: [{tileSize: 256, size: 512}],
        faceSize: 512,
        linkHotspots: [],
        infoHotspots: []
      }
    ]
  };

  // Grab elements from DOM
  var panoElement = document.querySelector('#pano');
  var sceneNameElement = document.querySelector('#titleBar .sceneName');
  var sceneListElement = document.querySelector('#sceneList .scenes');
  var sceneListToggleElement = document.querySelector('#sceneListToggle');
  var autorotateToggleElement = document.querySelector('#autorotateToggle');
  var fullscreenToggleElement = document.querySelector('#fullscreenToggle');

  // Detect desktop or mobile
  function setMode() {
    if (window.matchMedia("(max-width: 500px), (max-height: 500px)").matches) {
      document.body.classList.remove('desktop');
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
      document.body.classList.add('desktop');
    }
  }
  setMode();
  window.addEventListener('resize', setMode);

  // Touch detection
  document.body.classList.add('no-touch');
  window.addEventListener('touchstart', function() {
    document.body.classList.remove('no-touch');
    document.body.classList.add('touch');
  });

  // Viewer
  var viewer = new Marzipano.Viewer(panoElement, { controls: { mouseViewMode: data.settings.mouseViewMode } });

  // Create scenes
  var scenes = data.scenes.map(function(sceneData) {
    var source = Marzipano.ImageUrlSource.fromString(
      "tiles/" + sceneData.id + "/{z}/{f}/{y}/{x}.jpg",
      { cubeMapPreviewUrl: "tiles/" + sceneData.id + "/preview.jpg" }
    );
    var geometry = new Marzipano.CubeGeometry(sceneData.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100*Math.PI/180, 120*Math.PI/180);
    var view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
    var scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });

    // Add scene list
    var el = document.createElement('div');
    el.className = 'scene';
    el.setAttribute('data-id', sceneData.id);
    el.innerHTML = '<div class="text">' + sceneData.name + '</div>';
    sceneListElement.appendChild(el);
    el.addEventListener('click', function() { switchScene(scene); });

    return { data: sceneData, scene, view };
  });

  function sanitize(s) {
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;');
  }

  function switchScene(scene) {
    scene.view.setParameters(scene.data.initialViewParameters);
    scene.scene.switchTo();
    sceneNameElement.innerHTML = sanitize(scene.data.name);
    updateSceneList(scene);
  }

  function updateSceneList(current) {
    document.querySelectorAll('#sceneList .scene').forEach(function(el) {
      if (el.getAttribute('data-id') === current.data.id) el.classList.add('current');
      else el.classList.remove('current');
    });
  }

  // Autorotate
  var autorotate = Marzipano.autorotate({ yawSpeed: 0.03, targetPitch: 0, targetFov: Math.PI/2 });
  autorotateToggleElement.addEventListener('click', function() {
    if (autorotateToggleElement.classList.contains('enabled')) {
      autorotateToggleElement.classList.remove('enabled');
      viewer.stopMovement();
    } else {
      autorotateToggleElement.classList.add('enabled');
      viewer.startMovement(autorotate);
    }
  });
  if (data.settings.autorotateEnabled) autorotateToggleElement.classList.add('enabled');

  // Fullscreen
  if (screenfull.enabled) {
    fullscreenToggleElement.addEventListener('click', function() { screenfull.toggle(); });
  }

  // Scene list toggle
  sceneListToggleElement.addEventListener('click', function() {
    document.getElementById('sceneList').classList.toggle('enabled');
  });

  // Display initial scene
  switchScene(scenes[0]);

})();
