/**
 * @file main.js
 * @brief Fichier principal du projet
 * @version 1.1
 * @date 2024-01-15
 * @author MaxMontouro 
 */

//INCLUSION DES FICHIERS JS
import { Mot } from "./Mot.js";
import { dictionnaireJSON } from "./Donnee.js";

//------------------------------------
//         méthode pour l'AJAX
//------------------------------------

function effectuerRequeteAjax(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        document.getElementById("resultat").innerHTML = this.responseText;
    }
    xhttp.open("GET", url);
    xhttp.send();
}

//------------------------------------
//              Main
//------------------------------------

class Main {
    constructor() {
        this.init();
    }

    init() {
            console.log("Bienvenue dans le projet Vinylog");
            console.log("---------------------------------------------------");
            console.log("---------------------------------------------");
    
            const formulaire = document.getElementById("demonstration-form");
    
            formulaire.addEventListener("submit", async (event) => {
                event.preventDefault();
                const motElement = document.getElementById("mot");
                const motValue = motElement.value.trim();
                if (motValue !== "") {
                    const mot = new Mot(motValue.length, motValue);
                    console.log("mot :", mot.getTaille(), mot.getDescription());
                    
                    /**
                     *              Algorithme de Damerau-Levenshtein
                     **/
                    const listeMotAvecDamerauLevenshteinsteMot = {};
                    //parcours des valeurs                    
                    const dictionnaireValues = Object.values(dictionnaireJSON);
                    // Parcourir les catégories du dictionnaire
                    for (const categorie in dictionnaireValues) {
                        if (dictionnaireValues.hasOwnProperty(categorie)) {
                            // Parcourir les éléments de chaque catégorie
                            for (const elementCategorie of dictionnaireValues[categorie]) {
                                // Parcourir les propriétés de chaque élément
                                for (const prop in elementCategorie) {
                                    // Vérifier si la propriété est une chaîne de caractères
                                    if (elementCategorie.hasOwnProperty(prop)) {
                                        if (typeof elementCategorie[prop] === "string") {
                                            const distance = await mot.damerauLevenshteinDistance(elementCategorie[prop], mot.getDescription());
                                            if (distance < 2) {
                                                listeMotAvecDamerauLevenshteinsteMot[elementCategorie[prop]] = distance;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }                                     
                    
                    console.log("L'algorithme de Damerau-Levenshtein a fini de tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de Damerau-Levenshtein, les mots suivants sont proches du mot saisi :");
                    console.log("listeMotAvecDamerauLevenshteinsteMot :", listeMotAvecDamerauLevenshteinsteMot);

                    // Affichage des résultats
                    this.afficherResultats(listeMotAvecDamerauLevenshteinsteMot);

                    /**
                     *              Algorithme de correction du clavier
                     **/
                    mot.corrigerClavier(mot.getDescription());

                    mot.afficherCombinaison();
            
                    
                }
            }
        )};           
    
    
    afficherResultats(listeMotAvecDamerauLevenshteinsteMot) {
        const resultatElement = document.getElementById("resultat");
        resultatElement.innerHTML = "";
        resultatElement.innerHTML += `<p> Le resultat de l'algorithme de damarau-levenshtein est : </p> <br>`;
        for (const [mot, distance] of Object.entries(listeMotAvecDamerauLevenshteinsteMot)) {
            resultatElement.innerHTML += `<p>${mot} avec une distance de ${distance}</p>`;
        }
    }
}


// Création d'une instance de l'application
const vinylogApp = new Main();