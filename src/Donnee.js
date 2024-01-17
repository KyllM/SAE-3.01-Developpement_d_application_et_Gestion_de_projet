/**
 * @file Donnee.js
 * @author MaxMontouro
 * @version 1.0
 * @date 2021-05-18
 */

//------------------------------------
//      INCLUSION FICHIERS
//------------------------------------

import { Lettre } from "./Lettre.js";


//------------------------------------
//      FONCTION GLOBAL
//------------------------------------

//fonction pour récupérer les données du fichier JSON (GLOBAL)
    /**
     * @param {string} cheminFichierJSON - chemin du fichier JSON
     * @return {dictionnaire} - dictionnaire contenant les données du fichier JSON
     * @brief récupère les données du fichier JSON et les stocke dans un dictionnaire
     * @version 1.0
     * @date 2021-05-18
     */
function recuperationJSON(cheminFichierJSON){


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

            // Renvoyer le résultat
            return resultat;
        })           
        .catch(error => {
            console.error("Erreur lors de la récupération du fichier JSON :", error);
            throw error; // Propager l'erreur pour que le traitement puisse être effectué par l'appelant si nécessaire
        });
}

let cheminFichierJSON = "./fichiersSprint2/donnees.json";
let dictionnaireJSON = await recuperationJSON(cheminFichierJSON);
export {dictionnaireJSON};

//------------------------------------
//      Classe Donnee
//------------------------------------

export class Donnee {

    /**
     * @brief constructeur de la classe Donnee qui ne peut pas être instancié car classe abstraite
     * @constructor
     */
    constructor() {
        if (new.target === Donnee) {
            throw new Error("On ne peut pas implémenté une classe abstraite");
        }
        // Initialisation commune à toutes les classes dérivées
    }
    //pas d'instanciation car classe abstraite 

    /**
     * @brief méthode qui permet de calculer la distance entre deux données
     * @brief cette méthode est abstraite
     */    
    damarauLevenshteinDistance(){
        throw new Error("La méthode 'damarauLevenshtein' doit être implémenté");
    };

    /**
     * @brief méthode qui permet de calculer la distance entre deux données
     * @brief cette méthode est abstraite
     */
    
    corrigerClavier(distanceErreur){
        throw new Error("La méthode 'corrigerClavier' doit être implémenté"); 
    };
}
