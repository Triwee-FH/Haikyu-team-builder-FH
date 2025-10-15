// Gestion de l'application principale du Team Builder

let equipe = {}; // objet qui contiendra les joueurs choisis

// Fonction d'initialisation
function initialiser() {
  afficherPersonnages(personnages); // depuis data.js
  afficherSlots(equipe);            // depuis ui.js

  // Événement quand on commence à déplacer un joueur
  document.addEventListener("dragstart", e => {
    if (e.target.classList.contains("personnage")) {
      e.dataTransfer.setData("id", e.target.dataset.id);
    }
  });

  // Barre de recherche
  document.getElementById("recherche").addEventListener("input", e => {
    const terme = e.target.value.toLowerCase();
    const filtres = personnages.filter(p =>
      p.nom.toLowerCase().includes(terme) ||
      p.ecole.toLowerCase().includes(terme)
    );
    afficherPersonnages(filtres);
  });

  // Boutons
  document.getElementById("sauvegarder").addEventListener("click", sauvegarderEquipe);
  document.getElementById("charger").addEventListener("click", chargerEquipe);
  document.getElementById("vider").addEventListener("click", viderEquipe);
}

// Ajouter un joueur dans une case (poste)
function ajouterPersonnageEquipe(id, poste) {
  const perso = personnages.find(p => p.id == id);
  if (!perso) return;

  equipe[poste] = perso;
  afficherSlots(equipe);
}

// Sauvegarder l'équipe dans le stockage local du navigateur
function sauvegarderEquipe() {
  localStorage.setItem("equipeHaikyu", JSON.stringify(equipe));
  alert("✅ Équipe sauvegardée !");
}

// Charger l'équipe sauvegardée
function chargerEquipe() {
  const sauvegarde = localStorage.getItem("equipeHaikyu");
  if (sauvegarde) {
    equipe = JSON.parse(sauvegarde);
    afficherSlots(equipe);
  } else {
    alert("⚠️ Aucune équipe trouvée.");
  }
}

// Réinitialiser complètement l'équipe
function viderEquipe() {
  equipe = {};
  afficherSlots(equipe);
}

// Démarrage de l'app
window.addEventListener("DOMContentLoaded", initialiser);