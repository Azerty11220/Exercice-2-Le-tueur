"use strict"; 
// Cette ligne active le mode strict qui impose des règles strictes pour l'écriture du code JavaScript, ce qui contribue à éviter certaines erreurs courantes.
const caractéristiques = ["musicien", "blonde", "sportif", "nerd", "sorcière"]; // Un tableau contenant les caractéristiques des survivants.
const prenoms = ["Thomas", "Timoté", "Timéo", "Titouan", "Tom"]; // Un tableau contenant les prénoms des survivants.
const stats = [
  
  [0.4, 0.2, 0.4],
  [0.3, 0.4, 0.3],
  [0.2, 0.6, 0.2],
  [0.3, 0.5, 0.2],
  [0.1, 0.4, 0.5],
]; // Un tableau de tableaux représentant les probabilités d'utiliser différentes attaques pour chaque survivant.
const joueurs = []; // Un tableau dans lequel seront ajoutés les objets de la classe Personnage représentant les survivants.
const survivantsMorts = []; // Un tableau qui va contenir les noms des survivants morts.
const tueur = ["Jason", 100]; // Une variable qui définit le pseudo du tueur ("Jason") et ses points de vie (100).
class Personnage {
  // Définition d'une classe appelée "Personnage" pour créer des objets qui représentent les survivants.
  constructor(nom, caractéristique, probaDead, probaDmg, probaDmgDead) {
    this.probaDead = probaDead;
    this.probaDmg = probaDmg;
    this.probaDmgDead = probaDmgDead;
    
    this.nom = nom;
    this.caractéristique = caractéristique;
   
  }
}

function attaqueTueur(survivantCible, chiffreSurvivantAleatoire) {
  // Fonction qui simule une attaque du tueur contre un survivant.

  const valeurAleatoire = Math.random(); // Génère un nombre aléatoire entre 0 (inclus) et 1 (exclus).

  if (valeurAleatoire < survivantCible.probaDead) {
    // Si la valeur aléatoire est inférieure à la probabilité de mort du survivant.
    console.log("Jason a tué", survivantCible.nom);
    survivantsMorts.push(survivantCible.nom);
    joueurs.splice(chiffreSurvivantAleatoire, 1);
  } else if (
    valeurAleatoire < survivantCible.probaDead + survivantCible.probaDmg
  ) {
    // Si la valeur aléatoire est inférieure à la somme de la probabilité de mort et de la probabilité de causer des dégâts.
    console.log(survivantCible.nom, "esquive l'attaque de Jason et lui inflige 10 de dégats !");
    tueur[1] -= 10; // Réduit les points de vie du tueur de 10.
  } else {
    // Si la valeur aléatoire est supérieure aux probabilités précédentes, le survivant se sacrifie.
    console.log(
      survivantCible.nom,
      "se sacrifie en mettant 15 dégâts à Jason !"
    );
    tueur[1] -= 15; // Réduit les points de vie du tueur de 15.
    survivantsMorts.push(survivantCible.nom);
    joueurs.splice(chiffreSurvivantAleatoire, 1);
  }

  console.log("Survivants morts :", survivantsMorts);

  combat(); // Appelle la fonction "combat" pour continuer le jeu.
}

function combat() {
  // Fonction qui simule le combat entre le tueur et les survivants restants.

  let affichageMort = "";

  if (joueurs.length >= 1 && tueur[1] > 0) {
    // S'il reste au moins un survivant et que le tueur a des points de vie.
    const chiffreSurvivantAleatoire = Math.floor(
      Math.random() * joueurs.length
    ); // Sélectionne aléatoirement un survivant.
    const survivantCible = joueurs[chiffreSurvivantAleatoire];
    attaqueTueur(survivantCible, chiffreSurvivantAleatoire); // Appelle la fonction d'attaque du tueur.
  } else if (joueurs.length >= 1 && tueur[1] <= 0) {
    // S'il reste au moins un survivant mais que le tueur n'a plus de points de vie.
    for (let i = 0; i < survivantsMorts.length; i++) {
      const test = survivantsMorts[i];

      if (survivantsMorts.length !== 1) {
        if (test === survivantsMorts[survivantsMorts.length - 1]) {
          affichageMort += " et " + test + "..."; // Construction de la liste des survivants morts.
        } else if (test === survivantsMorts[survivantsMorts.length - 2]) {
          affichageMort += test;
        } else {
          affichageMort += test + ", ";
        }
      } else {
        affichageMort += test + ".";
      }
    }
    if (!affichageMort) {
      console.log("Jason est mort ! Tout le monde à survcu...");
    } else {
      console.log("Jason est mort ! On remercie", affichageMort,"pour leurs sacrifices");
    }
  } else if (joueurs.length === 0 && tueur[1] > 0) {
    console.log(
      "Jason a gagné, il n'y a plus aucun survivant. Il lui reste " +
        tueur[1] +
        " points de vie !"
    );
  } else if (joueurs.length === 0 && tueur[1] <= 0) {
    console.log(
      "Tous les survivants sont mort" +
        affichageMort +
        " Il n'y a plus aucun survivant et Jason et mort aussi ! "
    );
  }
}

prenoms.forEach((nom) => {
  // Pour chaque prénom dans le tableau "prenoms".
  const a = Math.floor(Math.random() * caractéristiques.length); // Sélectionne aléatoirement un indice de caractéristique.
  const caractéristique = caractéristiques.splice(a, 1)[0]; // Retire la caractéristique sélectionnée pour éviter les doublons.

  const b = Math.floor(Math.random() * stats.length); // Sélectionne aléatoirement un indice de statistiques.
  const statPerso = stats.splice(b, 1)[0]; // Retire les statistiques sélectionnées pour éviter les doublons.

  const joueur = new Personnage(
    nom,
    caractéristique,
    statPerso[0],
    statPerso[1],
    statPerso[2]
  ); // Crée un objet Personnage avec le nom, la caractéristique et les statistiques aléatoires.
  joueurs.push(joueur); // Ajoute cet objet Personnage dans le tableau "joueurs".
});

combat(); // Appelle la fonction "combat" pour commencer le jeu.
