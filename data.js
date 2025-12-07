var APP_DATA = {
  "scenes": [
    {
      "id": "0-bureau-1",
      "name": "BUREAU 1",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/bureau-1/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -2.855907175348362,
          "pitch": 0.38777386963086613,
          "rotation": 5.497787143782138,
          "target": "5-hall-2"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-bureau-2-balcon",
      "name": "BUREAU 2 BALCON",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/bureau-2-balcon/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": 2.675429672857386,
          "pitch": 0.3049209640906252,
          "rotation": 0,
          "target": "5-hall-2"
        },
        {
          "yaw": 2.8884899889707096,
          "pitch": -0.02331902360188387,
          "rotation": 0,
          "target": "3-cuisine"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-bureau-3",
      "name": "BUREAU 3",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/bureau-3/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "3-cuisine",
      "name": "CUISINE",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": 1.285225234039098,
        "pitch": 0.3040812060326896,
        "fov": 1.4688428655418002
      },
      "image": {
        "base": "tiles/cuisine/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -2.2599082876554277,
          "pitch": 0.14805374633418822,
          "rotation": 0,
          "target": "1-bureau-2-balcon"
        },
        {
          "yaw": -1.8255140156982606,
          "pitch": 0.15872562552399572,
          "rotation": 0,
          "target": "0-bureau-1"
        },
        {
          "yaw": -2.004159769727309,
          "pitch": 0.5865995762077549,
          "rotation": 0,
          "target": "5-hall-2"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-hall-1",
      "name": "HALL 1",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "yaw": 0,
        "pitch": 0,
        "fov": 1.4688428655418002
      },
      "image": {
        "base": "tiles/hall-1/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -0.0784716986107643,
          "pitch": 0.5680307545466441,
          "rotation": 0,
          "target": "4-hall-1"
        },
        {
          "yaw": 0.3040091344365621,
          "pitch": 0.3097429480094007,
          "rotation": 0,
          "target": "6-salle-d-attente"
        },
        {
          "yaw": 0.19379183302648606,
          "pitch": 0.024505703380489408,
          "rotation": 0,
          "target": "7-salle-reunion"
        },
        {
          "yaw": 3.037899769385721,
          "pitch": 0.4465008889107196,
          "rotation": 0,
          "target": "5-hall-2"
        },
        {
          "yaw": 2.9068680001253906,
          "pitch": -0.02704118805723965,
          "rotation": 0,
          "target": "0-bureau-1"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-hall-2",
      "name": "HALL 2",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/hall-2/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -0.09869096149695622,
          "pitch": 0.14837636790586473,
          "rotation": 0,
          "target": "3-cuisine"
        },
        {
          "yaw": 1.0038908863114901,
          "pitch": 0.09434127378355406,
          "rotation": 0,
          "target": "2-bureau-3"
        },
        {
          "yaw": -1.0581394062176557,
          "pitch": 0.23029518976325924,
          "rotation": 0,
          "target": "4-hall-1"
        },
        {
          "yaw": 2.0500847372549904,
          "pitch": 0.572735806718887,
          "rotation": 0,
          "target": "1-bureau-2-balcon"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-salle-d-attente",
      "name": "SALLE D ATTENTE",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {

        "base": "tiles/salle-d-attente/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -3.0657378984091714,
          "pitch": 0.43154289444510496,
          "rotation": 0,
          "target": "4-hall-1"
        },
        {
          "yaw": 2.6184596740938657,
          "pitch": 0.026003875057888592,
          "rotation": 0,
          "target": "8-toilette-pmr"
        },
        {
          "yaw": -2.3880974393746364,
          "pitch": 0.030399017032408437,
          "rotation": 0,
          "target": "7-salle-reunion"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-salle-reunion",
      "name": "SALLE REUNION",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/salle-reunion/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": -2.5588765607322124,
          "pitch": 0.4380023989737154,
          "rotation": 0,
          "target": "4-hall-1"
        },
        {
          "yaw": -2.599933534348869,
          "pitch": 0.04171772869101886,
          "rotation": 0,
          "target": "8-toilette-pmr"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-toilette-pmr",
      "name": "TOILETTE PMR",
      "levels": [
        { "tileSize": 256, "size": 256, "fallbackOnly": true },
        { "tileSize": 512, "size": 512 },
        { "tileSize": 512, "size": 1024 }
      ],
      "faceSize": 1024,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "image": {
        "base": "tiles/toilette-pmr/{z}/{f}/0/{y}/{x}.jpg",
        "format": "jpg",
        "size": 1024,
        "fallbackOnly": false
      },
      "linkHotspots": [
        {
          "yaw": 2.769711939031364,
          "pitch": 0.08010990738021562,
          "rotation": 0,
          "target": "6-salle-d-attente"
        },
        {
          "yaw": 2.7167157802725033,
          "pitch": 0.5571207169870362,
          "rotation": 0,
          "target": "4-hall-1"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": false,
    "viewControlButtons": true
  }
};
