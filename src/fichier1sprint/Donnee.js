export const  matrice = new Array();
matrice = [
    ['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', ')'],
    ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^'],
    ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù'],
    ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '!']
  ]


export class Donnee{
    constructor(identifiant, nom){
        this.identifiant = identifiant;
        this.nom = nom;
    };



    damarauLevenshteinDistance(){
        throw new Error("La méthode 'damarauLevenshtein' doit être implémenté");
    };

    explorerCombinaison(){
        throw new Error("La méthode 'explorerCombinaison' doit être implémenté"); 
    };
}