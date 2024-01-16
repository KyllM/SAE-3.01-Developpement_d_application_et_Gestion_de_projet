/**
 * @fileoverview  Fichier de la classe Lettre
 * @module Lettre
 */

//------------------------------------
//      Classe Lettre
//------------------------------------

export class Lettre {

    // ATTRIBUTS
    carac; // Caractère de la lettre
    coordonnees; // Coordonnées de la lettre dans la matrice
    matrice; // Matrice clavier

    // CONSTRUCTEUR
    /**
     * @brief constructeur de la classe Lettre
     * @param {*} lettre - Caractère de la lettre
     */
    constructor(lettre) {
        // Attributs encapsulés
        this.carac = lettre;
        this.matrice = this.initialiserMatrice();
        this.coordonnees = this.getCoordonnees(this.carac);
        this.typeMatrice = "clavier";
    }

    // ENCAPSULATION
    /**
     * @brief get&set des attributs carac, coordonnees
     */

    getCarac() {
        return this.carac;
    }

    setCarac(nouveauCarac) {
        this.carac = nouveauCarac;
    }

    getMatrice() {
        return this.matrice;
    }

    getTypeMatrice() { 
        return this.typeMatrice;
    }

    // Méthode pour initialiser la matrice clavier
    initialiserMatrice() {
        // Création de la matrice clavier
        const matrice = [
            ['&', 'é', '"', "'", '(', '-', 'è', '_', 'ç', 'à', ')'],
            ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '^'],
            ['q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'ù'],
            ['w', 'x', 'c', 'v', 'b', 'n', ',', ';', ':', '!', '!']
        ];

        return matrice;
    }

    // Méthode pour récupérer les coordonnées de la lettre dans la matrice clavier
    getCoordonnees() {
        let coordonnees;
        for (let i = 0; i < this.getMatrice().length; i++) {
            for (let j = 0; j < this.getMatrice()[i].length; j++) {
                if (this.getMatrice()[i][j] === this.carac) {
                    coordonnees = [i, j];
                }
            }
        }
        return coordonnees;
    }
    
    setCoordonnees(nouvellesCoordonnees) {
        this.coordonnees = nouvellesCoordonnees;
    }
    
    getDistance(uneLettre){ 
        const distanceLignes = Math.abs(this.getCoordonnees()[0] - uneLettre.getCoordonnees()[0]);
        const distanceColonnes = Math.abs(this.getCoordonnees()[1]- uneLettre.getCoordonnees()[1]);
        return Math.sqrt(distanceLignes ** 2 + distanceColonnes ** 2);
    }

    setLettre(nouvelleLettre) {
        this.carac = nouvelleLettre;
        this.coordonnees = this.getCoordonnees();
    }
  
}
