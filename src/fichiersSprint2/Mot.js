/**
 * @fileoverview  Fichier contenant la classe Mot
 * @version 1.0
 * @since 2021-05-18
 * @module Mot
 * @author MaxMontouro
 */

//INCLUSION DES FICHIERS JS
import {Donnee, matrice, dictionnaireJSON} from "./Donnee.js";


//------------------------------------
//      Classe Mot
//------------------------------------

export class Mot extends Donnee{

    //ATTRIBUTS
    taille; //taille du mot

    //CONSTRUCTEUR
    /**
     * @brief constructeur de la classe Mot
     * @param {*} taille 
     * @param {*} description
     */
    constructor(taille, description){
        super();
        this.setTaille(taille);
        this.setDescription(description);
    };

    //ENCAPSULATION
    /**
     * 
     * @brief get&set des attributs  nom, mot, ArrayDonnee
     */

    getTaille(){
        return this.taille;
    }
    
    setTaille(uneTaille){
        this.taille = uneTaille;
    }

    getDescription(){
        return this.description;
    }

    setDescription(uneDescription){
        this.description = uneDescription;
    }

    //METHODES SPECIFIQUES
    damerauLevenshteinDistance(str1, str2) {
        /**
         * @brief : methode qui permet de calculer la distance de Damerau-Levenshtein entre deux chaines de caractères
         * @param : str1, str2
         * @return : distance de Damerau-Levenshtein entre deux chaines de caractères
         */
    
            const longueur1 = str1.length;
            const longueur2 = str2.length;
            const tableau= Array(longueur1 + 1).fill(null).map(() => Array(longueur2 + 1).fill(null)); //  crée une matrice vide avec des dimensions longueur1 + 1 x longueur2 + 1
    
            for (let i = 0; i <= longueur1; i++) {
                tableau[i][0] = i;
            }
    
            for (let j = 0; j <= longueur2; j++) {
                tableau[0][j] = j;
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
                    
                    tableau[i][j] = Math.min(
                        tableau[i - 1][j] + 1, // Suppression
                        tableau[i][j - 1] + 1, // Insertion
                        tableau[i - 1][j - 1] + coutSubstitution // Substitution
                    );
    
                    if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
                        tableau[i][j] = Math.min(tableau[i][j], tableau[i - 2][j - 2] + coutSubstitution); // Transposition
                    }
                }
            }
            //console.log(tableau[longueur1][longueur2])
            return tableau[longueur1][longueur2];
    }
    
    /*ajouterTableau(mot, listeMotAvecDamerauLevenshteinsteMot){
            if(this.damarauLevenshteinDistance(mot, this.getMot()) < 2){
                listeMotAvecDamerauLevenshteinsteMot.push(mot);
            }
    }*/

    recupererCoordonnesLettre(lettre){
    
        /**
         * @brief : methode qui permet de recuperer les coordonnees d'une lettre dans la matrice clavier
         * @param : lettre
         * @return : coordonnees de la lettre dans la matrice clavier
         */
    
            for(let i = 0; i< matrice.length; i++){
                for(let j = 0; j< matrice[i].length; j++){
                    if(matrice[i][j] == lettre){
                        return [i,j];
                    }
                }
            }
    }
    
    corrigerClavier(mot){
        /** 
        *  @brief : methode qui permet de comparer un mot saisie au clavier et permet d'en ressortir un mot corrige avec un nombre d'erreur < 2
        *  @param : mot : string 
        *  @return : motPertinant 
        */
    
        var compteur = 0; //compteur de faute
        let motPertinant = ""; //mot corriger
        let listePertinante = new Array(); //tableau de mot corriger


        //parcours du mot
        dictionnaireJSON.forEach(element => {
            if(element.length == mot.length){
                compteur = 0;
                for(let i = 0; i < mot.length; i++){
                    var indiceX = this.recupererCoordonnesLettre(mot[i][0]);
                    var indiceY = this.recupererCoordonnesLettre(mot[i][1]);
                    if(mot[i] != matrice[indiceX][indiceY] && element[i] != matrice[indiceX][indiceY]){
                        for(let j = indiceX; j< matrice.length; j++){
                            for(let k=indiceY; k< matrice[j].length; k++){
                                //on regarde si les coordonnees de la lettre recupere dans la matrice clavier sont les bonnes par rapport au mot saisie
                                switch(matrice[indiceX][indiceY]){
                                    case matrice[j+1][k]:
                                        compteur++;
                                        break;
                                    case matrice[j][k+1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j][k+1];
                                        break;
                                    case matrice[j+1][k+1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j+1][k+1];
                                        break;
                                    case matrice[j-1][k]:
                                        compteur++;
                                        motPertinant[i] = matrice[j-1][k];
                                        break;
                                    case matrice[j][k-1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j][k-1];
                                        break;
                                    case matrice[j-1][k-1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j-1][k-1];
                                        break;
                                    case matrice[j+1][k-1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j+1][k-1];
                                        break;
                                    case matrice[j-1][k+1]:
                                        compteur++;
                                        motPertinant[i] = matrice[j-1][k+1];
                                        break;
                                    }
                                }
                            }   
                        }
                        else{
                            motPertinant[i] = mot[i];
                        }
        
                    //si le compteur est superieur ou egal a 2 on sort de la boucle
                    if(compteur >= 2){
                        break;
                    }
                }
            }
            if(compteur < 0 ){
                listePertinante.push(motPertinant);
            }
            }) 
        return listePertinante;
    } 
    
    verifierCoherence(mot, motPertinant, tableau){
        /**
         * 
         * @param {+} mot 
         * @param {*} motPertinant 
         * @param {*} tableau 
         * @return motLePlusPertinant qui contient le mot le plus pertinant par rapport au mot saisie. Ce mot a été filtré par rapport à la saisie clavier et damaraulevenshtein
         */
    
            let motLePlusPertinant;
            if(tableau.includes(motPertinant)){
                motLePlusPertinant = motPertinant;
            }
            else{
                this.damarauLevenshteinDistance(mot, motPertinant);
            }
            return motLePlusPertinant;
    }
    
}