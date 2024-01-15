/**
 * @file main.js
 * @brief Fichier principal du projet
 * @version 1.0
 * @date 2021-05-18
 * @author MaxMontouro 
 */

//INCLUSION DES FICHIERS JS
import {Mot} from "./Mot.js";
import {Donnee} from "./Donnee.js";
import {Vinyle} from "./Vinyle.js";
import {dictionnaireJSON} from "./Donnee.js";

//------------------------------------
//              Main
//------------------------------------
async function main() {

    document.addEventListener("DOMContentLoaded", function () {
        console.log("Bienvenue dans le projet Vinylog");
        console.log("---------------------------------------------------");
        console.log("---------------------------------------------");

        const listeMotAvecDamerauLevenshteinsteMot = {};
        const formulaire = document.getElementById("demonstration-form");

        formulaire.addEventListener("submit", async function (event) {
            event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
            const motElement = document.getElementById("demonstration");
            const motValue = motElement.value;
            console.log("avant le if");
            if (motValue.trim() !== "") {
                const mot = new Mot(motValue);
                console.log("mot :");
                console.log(mot);
                for (const element of dictionnaireJSON) {
                    const distance = await mot.damaraulevenshtein(element, mot);
                    if (distance < 2) {
                        listeMotAvecDamerauLevenshteinsteMot[element] = distance;
                    }
                }
                console.log("listeMotAvecDamerauLevenshteinsteMot :");
                console.log(listeMotAvecDamerauLevenshteinsteMot);

                mot.explorerCombinaison();
                mot.afficherCombinaison();
                }
            });
    });
}


