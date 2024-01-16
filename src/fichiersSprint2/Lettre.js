/**
 * @fileoverview  Fichier de la classe Lettre
 * @module Lettre
 */

//------------------------------------
//      Variable Global
//------------------------------------

const TAILLE_X = 11; // Taille de la matrice en x
const TAILLE_Y = 4; // Taille de la matrice en y

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
        this.coordonnees = this.getCoordonnees(lettre);
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

    getDistance(uneLettre) {
        return Math.abs(this.coordonnees[0] - uneLettre.coordonnees[0]) + Math.abs(this.coordonnees[1] - uneLettre.coordonnees[1]);
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

        // Initialisation des coordonnées
        for (let i = 0; i < TAILLE_X; i++) {
            for (let j = 0; j < TAILLE_Y; j++) {
                this.coordonnees = [i, j];
            }
        }

        return matrice;
    }

    // Méthode pour récupérer les coordonnées de la lettre dans la matrice clavier
    getCoordonnees(lettre) {
        return this.coordonnees;
    }

}
