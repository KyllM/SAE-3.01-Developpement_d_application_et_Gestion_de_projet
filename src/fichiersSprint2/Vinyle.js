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
    constructor(titre, artiste, annee, genre){
        super();
        this.titre = titre;
        this.artiste = artiste;
        this.annee = annee;
        this.genre = genre;
    }

    getTitre(){
        return this.titre;
    }
    
    getArtiste(){
        return this.artiste;
    }

    getAnnee(){
        return this.annee;
    }
    
    getGenre(){
        return this.genre;
    }

    setTitre(unTitre){
        this.titre = unTitre;
    }

    setArtiste(unArtiste){
        this.artiste = unArtiste;
    }

    setAnnee(uneAnnee){
        this.annee = uneAnnee;
    }

    setGenre(unGenre){
        this.genre = unGenre;
    }

    toString(){
        return 'Je suis le vinyle ' + this.getTitre() + " créé par " + this.getArtiste() + 
        " mon genre musical est : " + this.getGenre() + " et je suis sorti en : " + this.getAnnee();
    }    
}

