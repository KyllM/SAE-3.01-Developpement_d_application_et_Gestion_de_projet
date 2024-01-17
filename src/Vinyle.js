/**
 * @fileOverview Classe Vinyle
 * @version 1.0
 * @since 2021-05-18
 * @module Vinyle
 * @author MaxMontouro
 */

//------------------------------------
//      Classe Vinyle
//------------------------------------

import { Donnee } from "./Donnee.js";

export class Vinyle extends Donnee {
    /**
     * @constructor de la classe Vinyle
     * @param {*} titre 
     * @param {*} artiste 
     * @param {*} annee 
     * @param {*} genre 
     */
    constructor(titre, artiste, annee, genre){
        super();
        this.titre = titre;
        this.artiste = artiste;
        this.annee = annee;
        this.genre = genre;
    }
    /**
     * @brief get du titre du vinyle
     * @returns le titre du vinyle
     */
    getTitre(){
        return this.titre;
    }
    
    /**
     * @brief get de l'artiste du vinyle
     * @returns l'artiste du vinyle
     */
    getArtiste(){
        return this.artiste;
    }

    /**
     * @brief get de l'année du vinyle
     * @returns l'année du vinyle
     */
    getAnnee(){
        return this.annee;
    }
    
    /**
     * @brief get du genre du vinyle
     * @returns le genre du vinyle
     */
    getGenre(){
        return this.genre;
    }

    /**
     * @brief set du titre du vinyle
     * @param {*} unTitre 
     */
    setTitre(unTitre){
        this.titre = unTitre;
    }

    /**
     * @brief set de l'artiste du vinyle
     * @param {*} unArtiste 
     */
    setArtiste(unArtiste){
        this.artiste = unArtiste;
    }

    /**
     * @brief set de l'année du vinyle
     * @param {*} uneAnnee 
     */
    setAnnee(uneAnnee){
        this.annee = uneAnnee;
    }

    /**
     * @brief set du genre du vinyle
     * @param {*} unGenre 
     */
    setGenre(unGenre){
        this.genre = unGenre;
    }

    //METHODE SPECIFIQUE
    /**
     * @brief affiche les informations du vinyle
     * @returns les informations du vinyle
     */
    toString(){
        return 'Je suis le vinyle ' + this.getTitre() + " créé par " + this.getArtiste() + 
        " mon genre musical est : " + this.getGenre() + " et je suis sorti en : " + this.getAnnee();
    }    
}

