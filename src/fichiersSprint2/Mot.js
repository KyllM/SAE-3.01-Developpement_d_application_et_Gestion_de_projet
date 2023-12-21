/**
 * @fileoverview  Fichier contenant la classe Mot
 * @version 1.0
 * @since 2021-05-18
 * @module Mot
 * @author MaxMontouro
 */

//------------------------------------
//      Classe Mot
//------------------------------------

export class Mot{
    constructor(taille, description){
        setMot(taille, description);
    };

    getTaille(){
        return this.taille;
    }
    
    getDescrpition(){
        return this.description;
    }

    setTaille(uneTaille){
        this.taille = uneTaille;
    }

    setDescription(uneDescrpition){
        this.description = uneDescrpition;
    }

    tailleMot(unMot)// affiche la longueur d'un mot
    {
         console.log(unMot.lenght()); 
    }

    setMot(uneTaille, uneDescription){
        setTaille(uneTaille);
        setDescription(uneDescription);
    }

}