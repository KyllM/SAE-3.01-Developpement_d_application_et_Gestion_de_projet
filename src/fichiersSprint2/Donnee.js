/**
 * @file Donnee.js
 * @author MaxMontouro
 * @version 1.0
 * @date 2021-05-18
 */


export const  matrice = new Array();
matrice = [
    ['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', ')'],
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù'],
    ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '!']
  ]

  /**
   * @brief récupération des données du fichier JSON
   * @param aucun 
   * @return tableauJSON (tableau de données contenant les id du fichier json)
  */

export function recuperationDonneesJSON(){
    let tableauJSON = new Array();

    //récupération des données du fichier JSON
    fetch('donnees.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur HTTP : " + response.status);
        }
        return response.json();
    })
    .then(data => {
        for(let i = 0; i < data.length; i++){
            tableauJSON.push(data[i]);
        }
    });
    return tableauJSON;
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
