const viewer = document.getElementById("viewer");

pieces.forEach(piece => {
    const pieceDiv = document.createElement("div");
    pieceDiv.innerHTML = `<h2>${piece.name}</h2>
                          <img src="${piece.preview}" alt="${piece.name}" style="width:200px;cursor:pointer;" onclick="showPiece('${piece.name}')">`;
    viewer.appendChild(pieceDiv);
});

function showPiece(name) {
    const piece = pieces.find(p => p.name === name);
    if (!piece) return alert("Pièce non trouvée !");
    
    viewer.innerHTML = `<h2>${piece.name}</h2>`;
    piece.levels.forEach(lvl => {
        lvl.faces.forEach(face => {
            const imgPath = `tiles/${piece.name}/${lvl.level}/${face}/0/0.jpg`;
            const img = document.createElement("img");
            img.src = imgPath;
            img.style.width = "150px";
            img.style.margin = "2px";
            viewer.appendChild(img);
        });
    });
}

