/**
 * @fileoverview  Fichier de la classe Lettre
 * @module Lettre
 */

//INCLUSION DES FICHIERS JS
//import {} from "./fichier.js";


//------------------------------------
//      Classe Lettre
//------------------------------------

export class Lettre { // extends ?{

    // ATTRIBUTS
    carac; // Caractère de la lettre
    coordonnees; // Coordonnées de la lettre dans la matrice


    // CONSTRUCTEUR
    /**
     * @brief constructeur de la classe Lettre
     * @param {*} valeur 
     * @param {*} coordonnees
     */
    constructor(lettre) {
        // Attributs encapsulés
        this.carac = lettre;
        this.coordonnees = this.recupererCoordonnees();
    }



     // ENCAPSULATION
    /**
     * @brief get&set des attributs  carac, coordonnees
     */

    get carac() {
        return this.carac;
    }

    set carac(nouveauCarac) {
        this.carac = nouveauCarac;
    }

    get coordonnees() {
        return this.coordonnees;
    }





    // Méthode pour récupérer les coordonnées de la lettre dans la matrice clavier
    recupererCoordonnees() {
        for (let i = 0; i < matrice.length; i++) {
            for (let j = 0; j < matrice[i].length; j++) {
                if (matrice[i][j].carac === this.carac) {
                    return [i, j];
                }
            }
        }
    }



    matrice = [
        [new Lettre('&'), new Lettre('é'), new Lettre('"'), new Lettre("'"), new Lettre('('), new Lettre('-'), new Lettre('è'), new Lettre('_'), new Lettre('ç'), new Lettre('à'), new Lettre(')')],
        [new Lettre('a'), new Lettre('z'), new Lettre('e'), new Lettre('r'), new Lettre('t'), new Lettre('y'), new Lettre('u'), new Lettre('i'), new Lettre('o'), new Lettre('p'), new Lettre('^')],
        [new Lettre('q'), new Lettre('s'), new Lettre('d'), new Lettre('f'), new Lettre('g'), new Lettre('h'), new Lettre('j'), new Lettre('k'), new Lettre('l'), new Lettre('m'), new Lettre('ù')],
        [new Lettre('w'), new Lettre('x'), new Lettre('c'), new Lettre('v'), new Lettre('b'), new Lettre('n'), new Lettre(','), new Lettre(';'), new Lettre(':'), new Lettre('!'), new Lettre('!')]
    ];

}



    //METHODES SPECIFIQUES





