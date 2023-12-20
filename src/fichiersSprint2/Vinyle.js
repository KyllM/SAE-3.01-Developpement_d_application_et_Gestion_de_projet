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


class Vinyle extends Donnee{
    constructor(titre, artiste, annee, genre){
        this.titre = titre;
        this.artiste = artiste;
        this.annee = annee;
        this.genre = genre;
    };

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
        this.anee = uneAnnee;
    }

    setGenre(unGenre){
        this.genre = unGenre;
    }

    toString(){
        console.log('Je suis le vinyle ' + this.getTitre() + " créé par " + this.getArtiste() + 
        " mon genre musicale est : " + this.getGenre() + " et je suis sorti en : " + this.getAnnee());
    }

    setMot(uneTaille, uneDescription){
        setTaille(uneTaille);
        setDescription(uneDescription);
    }
}
