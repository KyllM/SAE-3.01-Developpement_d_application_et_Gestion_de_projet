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
export const cheminFichierJSON = "./donnees.json";

fetch(cheminFichierJSON)
.then(response => {
    if(!response.ok){
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
})

.then(donnesJSON => {
    console.log(donnesJSON);
})

then(data => {
    // Les données JSON sont disponibles ici
    console.log("Données JSON récupérées avec succès :", data);

    // Vous pouvez maintenant travailler avec les données comme vous le souhaitez
    // Par exemple, accéder à une propriété spécifique :
    console.log("Valeur de la propriété 'exemple' :", data.exemple);
  })
  .catch(error => {
    console.error("Erreur lors de la récupération du fichier JSON :", error);
});

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
