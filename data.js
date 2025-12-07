const rooms = {
  "bureau-1": {
    preview: "tiles/bureau-1/preview.jpg",
    levels: {
      1: { b: "tiles/bureau-1/1/b/0.jpg", d: "tiles/bureau-1/1/d/0.jpg", f: "tiles/bureau-1/1/f/0.jpg", l: "tiles/bureau-1/1/l/0.jpg", r: "tiles/bureau-1/1/r/0.jpg", u: "tiles/bureau-1/1/u/0.jpg" },
      2: { b: "tiles/bureau-1/2/b/0.jpg", d: "tiles/bureau-1/2/d/0.jpg", f: "tiles/bureau-1/2/f/0.jpg", l: "tiles/bureau-1/2/l/0.jpg", r: "tiles/bureau-1/2/r/0.jpg", u: "tiles/bureau-1/2/u/0.jpg" }
    }
  },
  "bureau-2-balcon": {
    preview: "tiles/bureau-2-balcon/preview.jpg",
    levels: {
      1: { b: "tiles/bureau-2-balcon/1/b/0.jpg", d: "tiles/bureau-2-balcon/1/d/0.jpg", f: "tiles/bureau-2-balcon/1/f/0.jpg", l: "tiles/bureau-2-balcon/1/l/0.jpg", r: "tiles/bureau-2-balcon/1/r/0.jpg", u: "tiles/bureau-2-balcon/1/u/0.jpg" },
      2: { b: "tiles/bureau-2-balcon/2/b/0.jpg", d: "tiles/bureau-2-balcon/2/d/0.jpg", f: "tiles/bureau-2-balcon/2/f/0.jpg", l: "tiles/bureau-2-balcon/2/l/0.jpg", r: "tiles/bureau-2-balcon/2/r/0.jpg", u: "tiles/bureau-2-balcon/2/u/0.jpg" }
    }
  },
  "bureau-3": {
    preview: "tiles/bureau-3/preview.jpg",
    levels: {
      1: { b: "tiles/bureau-3/1/b/0.jpg", d: "tiles/bureau-3/1/d/0.jpg", f: "tiles/bureau-3/1/f/0.jpg", l: "tiles/bureau-3/1/l/0.jpg", r: "tiles/bureau-3/1/r/0.jpg", u: "tiles/bureau-3/1/u/0.jpg" },
      2: { b: "tiles/bureau-3/2/b/0.jpg", d: "tiles/bureau-3/2/d/0.jpg", f: "tiles/bureau-3/2/f/0.jpg", l: "tiles/bureau-3/2/l/0.jpg", r: "tiles/bureau-3/2/r/0.jpg", u: "tiles/bureau-3/2/u/0.jpg" }
    }
  },
  "cuisine": {
    preview: "tiles/cuisine/preview.jpg",
    levels: {
      1: { b: "tiles/cuisine/1/b/0.jpg", d: "tiles/cuisine/1/d/0.jpg", f: "tiles/cuisine/1/f/0.jpg", l: "tiles/cuisine/1/l/0.jpg", r: "tiles/cuisine/1/r/0.jpg", u: "tiles/cuisine/1/u/0.jpg" },
      2: { b: "tiles/cuisine/2/b/0.jpg", d: "tiles/cuisine/2/d/0.jpg", f: "tiles/cuisine/2/f/0.jpg", l: "tiles/cuisine/2/l/0.jpg", r: "tiles/cuisine/2/r/0.jpg", u: "tiles/cuisine/2/u/0.jpg" }
    }
  },
  "hall-1": {
    preview: "tiles/hall-1/preview.jpg",
    levels: {
      1: { b: "tiles/hall-1/1/b/0.jpg", d: "tiles/hall-1/1/d/0.jpg", f: "tiles/hall-1/1/f/0.jpg", l: "tiles/hall-1/1/l/0.jpg", r: "tiles/hall-1/1/r/0.jpg", u: "tiles/hall-1/1/u/0.jpg" },
      2: { b: "tiles/hall-1/2/b/0.jpg", d: "tiles/hall-1/2/d/0.jpg", f: "tiles/hall-1/2/f/0.jpg", l: "tiles/hall-1/2/l/0.jpg", r: "tiles/hall-1/2/r/0.jpg", u: "tiles/hall-1/2/u/0.jpg" }
    }
  },
  "hall-2": {
    preview: "tiles/hall-2/preview.jpg",
    levels: {
      1: { b: "tiles/hall-2/1/b/0.jpg", d: "tiles/hall-2/1/d/0.jpg", f: "tiles/hall-2/1/f/0.jpg", l: "tiles/hall-2/1/l/0.jpg", r: "tiles/hall-2/1/r/0.jpg", u: "tiles/hall-2/1/u/0.jpg" },
      2: { b: "tiles/hall-2/2/b/0.jpg", d: "tiles/hall-2/2/d/0.jpg", f: "tiles/hall-2/2/f/0.jpg", l: "tiles/hall-2/2/l/0.jpg", r: "tiles/hall-2/2/r/0.jpg", u: "tiles/hall-2/2/u/0.jpg" }
    }
  },
  "salle-d-attente": {
    preview: "tiles/salle-d-attente/preview.jpg",
    levels: {
      1: { b: "tiles/salle-d-attente/1/b/0.jpg", d: "tiles/salle-d-attente/1/d/0.jpg", f: "tiles/salle-d-attente/1/f/0.jpg", l: "tiles/salle-d-attente/1/l/0.jpg", r: "tiles/salle-d-attente/1/r/0.jpg", u: "tiles/salle-d-attente/1/u/0.jpg" },
      2: { b: "tiles/salle-d-attente/2/b/0.jpg", d: "tiles/salle-d-attente/2/d/0.jpg", f: "tiles/salle-d-attente/2/f/0.jpg", l: "tiles/salle-d-attente/2/l/0.jpg", r: "tiles/salle-d-attente/2/r/0.jpg", u: "tiles/salle-d-attente/2/u/0.jpg" }
    }
  },
  "salle-reunion": {
    preview: "tiles/salle-reunion/preview.jpg",
    levels: {
      1: { b: "tiles/salle-reunion/1/b/0.jpg", d: "tiles/salle-reunion/1/d/0.jpg", f: "tiles/salle-reunion/1/f/0.jpg", l: "tiles/salle-reunion/1/l/0.jpg", r: "tiles/salle-reunion/1/r/0.jpg", u: "tiles/salle-reunion/1/u/0.jpg" },
      2: { b: "tiles/salle-reunion/2/b/0.jpg", d: "tiles/salle-reunion/2/d/0.jpg", f: "tiles/salle-reunion/2/f/0.jpg", l: "tiles/salle-reunion/2/l/0.jpg", r: "tiles/salle-reunion/2/r/0.jpg", u: "tiles/salle-reunion/2/u/0.jpg" }
    }
  },
  "toilette-pmr": {
    preview: "tiles/toilette-pmr/preview.jpg",
    levels: {
      1: { b: "tiles/toilette-pmr/1/b/0.jpg", d: "tiles/toilette-pmr/1/d/0.jpg", f: "tiles/toilette-pmr/1/f/0.jpg", l: "tiles/toilette-pmr/1/l/0.jpg", r: "tiles/toilette-pmr/1/r/0.jpg", u: "tiles/toilette-pmr/1/u/0.jpg" },
      2: { b: "tiles/toilette-pmr/2/b/0.jpg", d: "tiles/toilette-pmr/2/d/0.jpg", f: "tiles/toilette-pmr/2/f/0.jpg", l: "tiles/toilette-pmr/2/l/0.jpg", r: "tiles/toilette-pmr/2/r/0.jpg", u: "tiles/toilette-pmr/2/u/0.jpg" }
    }
  }
};
