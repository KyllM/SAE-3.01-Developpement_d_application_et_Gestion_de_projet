/**
 * @fileoverview  Fichier de la classe Lettre
 * @module Lettre
 * @version 1.0
 * @since 2021-05-18
 * @author MaxMontouro
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
     * @constructor 
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

    /**
     * @brief get du caractère de la lettre
     * @returns le caractère de la lettre
     */
    getCarac() {
        return this.carac;
    }

    /**
     * @brief get des coordonnées de la lettre
     * @returns les coordonnées de la lettre
     */

    setCarac(nouveauCarac) {
        this.carac = nouveauCarac;
    }

    /**
     * @brief get des coordonnées de la lettre
     * @returns les coordonnées de la lettre
     */
    getMatrice() {
        return this.matrice;
    }
    /**
     * @brief get des coordonnées de la lettre
     * @returns le type de la matrice
     */
    getTypeMatrice() { 
        return this.typeMatrice;
    }

    // Méthode pour initialiser la matrice clavier
    /**
     * @brief initialise la matrice clavier
     * @returns la matrice clavier
     */
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
    /**
     * @brief récupère les coordonnées de la lettre dans la matrice clavier
     * @returns les coordonnées de la lettre dans la matrice clavier
     */
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
    
    /**
     * @brief set des coordonnées de la lettre
     * @param {*} nouvellesCoordonnees 
     */
    setCoordonnees(nouvellesCoordonnees) {
        this.coordonnees = nouvellesCoordonnees;
    }
    
    /**
     * @brief méthode qui permet de calculer la distance entre deux lettres
     * @param {*} uneLettre 
     * @returns la distance entre la lettre passé en paramètre et la lettre courante
     */
    getDistance(uneLettre){ 
        const distanceLignes = Math.abs(this.getCoordonnees()[0] - uneLettre.getCoordonnees()[0]);
        const distanceColonnes = Math.abs(this.getCoordonnees()[1]- uneLettre.getCoordonnees()[1]);
        return Math.sqrt(distanceLignes ** 2 + distanceColonnes ** 2);
    }

    /**
     * @brief méthode qui permet de modifier la lettre
     * @param {*} nouvelleLettre 
     */
    setLettre(nouvelleLettre) {
        this.carac = nouvelleLettre;
        this.coordonnees = this.getCoordonnees();
    }
  
}
