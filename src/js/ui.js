// Fonctions pour gérer l'affichage du site (UI = Interface Utilisateur)

// Afficher la liste des personnages disponibles
function afficherPersonnages(liste) {
  const conteneur = document.getElementById("liste-personnages");
  conteneur.innerHTML = "";

  liste.forEach(p => {
    const div = document.createElement("div");
    div.className = "personnage";
    div.draggable = true;
    div.dataset.id = p.id;
    div.innerHTML = `
      <img src="src/images/${p.image}" alt="${p.nom}">
      <p>${p.nom}</p>
      <small>${p.poste} - ${p.ecole}</small>
    `;
    conteneur.appendChild(div);
  });
}

// Afficher les cases pour construire l'équipe
function afficherSlots(equipe) {
  const emplacements = document.getElementById("emplacements");
  emplacements.innerHTML = "";

  const postes = ["S", "WS", "MB", "L", "OP"];
  postes.forEach(poste => {
    const slot = document.createElement("div");
    slot.className = "slot";
    slot.dataset.poste = poste;

    if (equipe[poste]) {
      slot.classList.add("rempli");
      slot.innerHTML = `<div>${equipe[poste].nom}</div>`;
    } else {
      slot.textContent = poste;
    }

    // Permet de glisser-déposer un joueur dans la case
    slot.addEventListener("dragover", e => e.preventDefault());
    slot.addEventListener("drop", e => {
      const id = e.dataTransfer.getData("id");
      ajouterPersonnageEquipe(id, poste);
    });

    emplacements.appendChild(slot);
  });
}