/**
 * @fileoverview Fichier contenant la classe Voisin
 * @version 1.0
 * @since 2021-05-18
 * @module Voisin
 * @author MaxMontouro
 */

//importation des classes
import { Donnee } from "./donnee";
import { Mot } from "./Mot"
import { matrice } from "./donnee";

//------------------------------------
//      Classe Voisin
//------------------------------------

class Voisin extends Donnee {

    ArrayDonnee = new Array(); //tableau de mot

    //CONSTRUCTEUR
    constructor(unNom){
        super(Mot);
        this.setNom(unNom);
    }

    //ENCAPSULATION

    getNom(){
        return this.nom;
    }
    getArrayDonnee(){
        return this.ArrayDonnee;
    }
    getMot(){
        return this.Mot;
    }

    setNom(unNom){
        this.nom = unNom;
    }

    setArrayDonnee(unArrayDonnee){
        this.ArrayDonnee = unArrayDonnee;
    }

    setMot(unMot){
        this.setMot(unMot.uneTaille, unMot.uneDescription);
    }

    //METHODES SPECIFIQUES
    damerauLevenshteinDistance(str1, str2) {
            
        const longueur1 = str1.length;
        const longueur2 = str2.length;
        const matrice= Array(longueur1 + 1).fill(null).map(() => Array(longueur2 + 1).fill(null)); //  crée une matrice vide avec des dimensions longueur1 + 1 x longueur2 + 1

        for (let i = 0; i <= longueur1; i++) {
            matrice[i][0] = i;
        }

        for (let j = 0; j <= longueur2; j++) {
            matrice[0][j] = j;
        }

        for (let i = 1; i <= longueur1; i++) {
            for (let j = 1; j <= longueur2; j++) {
                
                let coutSubstitution=0;

                if(str1[i - 1]=== str2[j - 1]){
                    coutSubstitution = 0;
                }
                else{
                    coutSubstitution = 1;
                }
                
                matrice[i][j] = Math.min(
                    matrice[i - 1][j] + 1, // Suppression
                    matrice[i][j - 1] + 1, // Insertion
                    matrice[i - 1][j - 1] + coutSubstitution // Substitution
                );

                if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
                    matrice[i][j] = Math.min(matrice[i][j], matrice[i - 2][j - 2] + coutSubstitution); // Transposition
                }
            }
        }
        //console.log(matrice[longueur1][longueur2])
        return matrice[longueur1][longueur2];
    }

    correctionClavier(){
    /*
    *   @brief : methode qui permet de corriger un mot saisie au clavier
    *   @param : aucun
    *  @return : aucun
    *  Cet alogorithme permet de comparer un mot saisie au clavier avec la matrice clavier AZERTY
    * 
    * 
    */
        let mot = this.getNom(); //recupere du mot saisie
        var compteur = 0; //compteur de faute

        for(let i = 0; i< mot.length; i++){ //parcours le mot saisie
            for(let j = 0; j< matrice.length; j++){ //parcours la matrice
                for(let k = 0; k< matrice[j].length; k++){ //parcours la matrice
                    do{
                        if(mot[i] == matrice[j][k]){}; 
                            //si la lettre n'est pas la bonne la bonne dans la matrice clavier
                            
                            //mettre en place un switch 
                            switch(mot[i]){


                            else if(mot[i] == matrice[j+1][k]){  //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;}  //sinon il y a une faute
                            else if(mot[i] == matrice[j][k+1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j+1][k+1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j-1][k]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j][k-1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j-1][k-1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j+1][k-1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                            else if(mot[i] == matrice[j-1][k+1]){ //sinon si la lettre du mot est differente de la lettre de la matrice
                                compteur++;} //sinon il y a une faute
                        }
                    }while(compteur !=2); //tant que le compteur n'est pas egal a 2
                }
            }
        }
    }
}