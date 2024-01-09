/**
 * @file Donnee.js
 * @author MaxMontouro
 * @version 1.0
 * @date 2021-05-18
 */


var matrice = new Array();
var matrice = [
    ['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', ')'],
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù'],
    ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '!']
  ]

export function recuperationJSON(){
    /**
     * @param {string} cheminFichierJSON - chemin du fichier JSON
     * @return {dictionnaire} - dictionnaire contenant les données du fichier JSON
     * @brief récupère les données du fichier JSON et les stocke dans un dictionnaire
     * @version 1.0
     * @date 2021-05-18
     */

    let cheminFichierJSON = "./donnees.json";

    // Retourner une promesse
    return fetch(cheminFichierJSON)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(donneesJSON => {
            // Créer un dictionnaire à partir des données JSON
            var dictionnaire = {};
            for (var item of donneesJSON) {
                dictionnaire[item.cle] = item.valeur;
            }

            // Afficher le dictionnaire
            console.log("Dictionnaire JSON :", dictionnaire);

            // Renvoyer le dictionnaire
            return dictionnaire;
        })
        .catch(error => {
            console.error("Erreur lors de la récupération du fichier JSON :", error);
            throw error; // Propager l'erreur pour que le traitement puisse être effectué par l'appelant si nécessaire
        });
}
//------------------------------------
//      Classe Donnee
//------------------------------------

export class Donnee{

    //pas de constructeur car classe abstraite
    //pas d'instanciation car classe abstraite 

    toString(){};//methode abstraite pour la classe Donnee qui demande a être redéfinit dans les classes filles
    
    damarauLevenshteinDistance(){
        throw new Error("La méthode 'damarauLevenshtein' doit être implémenté");
    };

    explorerCombinaison(){
        throw new Error("La méthode 'explorerCombinaison' doit être implémenté"); 
    };
}
