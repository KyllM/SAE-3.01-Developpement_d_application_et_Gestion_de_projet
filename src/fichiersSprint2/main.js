/**
 * @file main.js
 * @brief Fichier principal du projet
 * @version 1.0
 * @date 2021-05-18
 * @author MaxMontouro 
 */

//INCLUSION DES FICHIERS JS
//import {Mot} from "./Mot.js";
//import {Vinyle} from "./Vinyle.js";


function recuperationJSON(cheminFichierJSON){
    /**
     * @param {string} cheminFichierJSON - chemin du fichier JSON
     * @return {dictionnaire} - dictionnaire contenant les données du fichier JSON
     * @brief récupère les données du fichier JSON et les stocke dans un dictionnaire
     * @version 1.0
     * @date 2021-05-18
     */

    // Retourner une promesse
    return fetch(cheminFichierJSON)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(donneesJSON => {
            // Vérifier si les données JSON sont bien formées
            if (!donneesJSON || typeof donneesJSON !== 'object') {
                throw new Error("Les données JSON ne sont pas valides.");
            }
        
            // Créer un objet ou un tableau en fonction du type de donneesJSON
            var resultat;
            if (Array.isArray(donneesJSON)) {
                // Si c'est un tableau, itérer et créer un objet
                resultat = {};
                for (var item of donneesJSON) {
                    resultat[item.cle] = item.valeur;
                }
            } else {
                // Si c'est un objet, utiliser directement
                resultat = donneesJSON;
            }
        
            // Afficher le résultat
            console.log("Résultat JSON :", resultat);
        
            // Renvoyer le résultat
            return resultat;
        })           
        .catch(error => {
            console.error("Erreur lors de la récupération du fichier JSON :", error);
            throw error; // Propager l'erreur pour que le traitement puisse être effectué par l'appelant si nécessaire
        });
}
//------------------------------------
//              Main
//------------------------------------

async function main() {
    console.log("Bienvenue dans le projet Vinylog");
    console.log("---------------------------------------------------");
    console.log("---------------------------------------------");

    try {
        let cheminFichierJSON = "./fichiersSprint2/donnees.json";
        let dictionnaireJSON = await recuperationJSON(cheminFichierJSON);
        console.log(dictionnaireJSON);

        // Continuez avec le reste de votre code ici
        /*
        var mot = getElementById("mot");
        mot = new Voisin(mot);

        mot.damaraulevenshteinDistance();
        mot.explorerCombinaison();
        */
    } catch (error) {
        console.error("Une erreur s'est produite dans le main :", error);
    }
}

main();