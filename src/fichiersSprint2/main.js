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
                const distanceSaisie = document.getElementById("distance").value;
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
                                            if (distance <=  distanceSaisie) {
                                                listeMotAvecDamerauLevenshteinsteMot[elementCategorie[prop]] = distance;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }                                     
                    
                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de Damerau-Levenshtein a fini de tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de Damerau-Levenshtein, les mots suivants sont proches du mot saisi (avec une distance maximum de " + distanceSaisie+ " ):");
                    console.log("listeMotAvecDamerauLevenshteinsteMot :", listeMotAvecDamerauLevenshteinsteMot);

                    // Affichage des résultats
                    this.afficherResultatsDamarau(listeMotAvecDamerauLevenshteinsteMot, distanceSaisie);

                    /**
                     *              Algorithme de correction du clavier
                     **/

                    const listeClavier = {};
                    //parcours des valeurs                    
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
                                            listeClavier = mot.corrigerClavier(elementCategorie, distanceSaisie);
                                            if (distance <=  distanceSaisie) {
                                                listeMotAvecDamerauLevenshteinsteMot[elementCategorie[prop]] = distance;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } 


                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de correction du clavier a fini de tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de correction du clavier, les mots suivants sont proches du mot saisi (avec une distance maximum de " + distanceSaisie+ " ):   ");
                    console.log("listeClavier :", listeClavier);
                    //affichage dans le navigateur
                    this.afficherResultatsClavier(listeClavier, distanceSaisie);
                    //mot.afficherCombinaison();
            
                    
                }
            }
        )};           
    
    
        afficherResultatsDamarau(listeMotAvecDamerauLevenshteinsteMot, distanceSaisie) {
            const resultatElement = document.getElementById("resultatDamarau");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de damarau-levenshtein est (avec une distance de ${distanceSaisie}): </p> <br>`;
            for (const [mot, distance] of Object.entries(listeMotAvecDamerauLevenshteinsteMot)) {
                resultatElement.innerHTML += `<p>${mot} avec une distance de ${distance}</p>`;
            }
        }

        afficherResultatsClavier(listeClavier, distanceSaisie) {
            const resultatElement = document.getElementById("resultatClavier");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de correction clavier est (avec une distance de ${distanceSaisie}): </p> <br>`;
            for (const [mot, distance] of Object.entries(listeClavier)) {
                resultatElement.innerHTML += `<p>${mot} avec une distance de ${distance}</p>`;
            }
        }
}


// Création d'une instance de l'application
const vinylogApp = new Main();