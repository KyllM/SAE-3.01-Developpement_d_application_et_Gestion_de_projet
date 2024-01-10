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
