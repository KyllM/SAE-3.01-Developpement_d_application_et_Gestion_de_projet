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
        //document.addEventListener("DOMContentLoaded", function() {
            console.log("Bienvenue dans le projet Vinylog");
            console.log("---------------------------------------------------");
            console.log("---------------------------------------------");
    
            const formulaire = document.getElementById("demonstration-form");
    
            formulaire.addEventListener("submit", async (event) => {
                event.preventDefault();
                const motElement = document.getElementById("mot");
                const motValue = motElement.value.trim();
                if (motValue !== "") {
                    const mot = new Mot(motValue.length);
                    console.log("mot :", mot);
            
                    const listeMotAvecDamerauLevenshteinsteMot = {};

                    //parcours des valeurs                    
                    Object.values(dictionnaireJSON).forEach(async (element) => {
                        try {
                            const distance = await mot.damerauLevenshteinDistance(element, mot);
                            if (distance < 2) {
                                listeMotAvecDamerauLevenshteinsteMot[element] = distance;
                            }
                        } catch (error) {
                            console.error("Une erreur s'est produite lors du calcul de la distance :", error);
                        }
                    });

                    console.log("listeMotAvecDamerauLevenshteinsteMot :", listeMotAvecDamerauLevenshteinsteMot);
            
                    mot.explorerCombinaison();
                    mot.afficherCombinaison();
            
                    // Affichage des résultats
                    this.afficherResultats(listeMotAvecDamerauLevenshteinsteMot);
                }
            });            
        //});
    }
    
    afficherResultats(listeMotAvecDamerauLevenshteinsteMot) {
        const resultatElement = document.getElementById("resultat");
        resultatElement.innerHTML = "";
        resultatElement.innerHTML += `<p> Le resultat de l'algorithme de damarau-levenshtein est : </p> <br>`;
        for (const [mot, distance] of Object.entries(listeMotAvecDamerauLevenshteinsteMot)) {
            resultatElement.innerHTML += `<p>${mot} (${distance})</p>`;
        }
    }
}

// Création d'une instance de l'application
const vinylogApp = new Main();