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
    /**
     * 
     * @brief get&set des attributs  nom, mot, ArrayDonnee
     */
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
    /**
     * @brief : methode qui permet de calculer la distance de Damerau-Levenshtein entre deux chaines de caractères
     * @param : str1, str2
     * @return : distance de Damerau-Levenshtein entre deux chaines de caractères
     */

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

    correctionClavier(){
    /** 
    *  @brief : methode qui permet de comparer un mot saisie au clavier et permet d'en ressortir un mot corrige avec un nombre d'erreur < 2
    *  @param : aucun
    *  @return : motCorriger 
    */
        let mot = this.getNom(); //recupere du mot saisie
        var compteur = 0; //compteur de faute
        let motCorriger = ""; //mot corriger

        for(let i = 0; i< mot.length; i++){ //parcours le mot saisie
            indiceX = this.recupererCoordonnesLettre(mot[i][0]); //recupere la coordonnee X de la lettre dans la matrice clavier
            indiceY = this.recupererCoordonnesLettre(mot[i][1]); //recupere la coordonne Y de la lettre dans la matrice clavier
                if(mot[i] != matrice[indiceX][indiceY]){
                //si la lettre n'est pas la bonne la bonne dans la matrice clavier
                    for(let j = indiceX; j< matrice.length; j++){
                        for(let k=indiceY; k< matrice[j].length; k++){
                            //on regarde si les coordonnees de la lettre recupere dans la matrice clavier sont les bonnes par rapport au mot saisie
                            switch(matrice[indiceX][indiceY]){
                                case matrice[j+1][k]:
                                    compteur++;
                                    break;

                                case matrice[j][k+1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j][k+1];
                                    break;
                                case matrice[j+1][k+1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j+1][k+1];
                                    break;
                                case matrice[j-1][k]:
                                    compteur++;
                                    motCorriger[i] = matrice[j-1][k];
                                    break;
                                case matrice[j][k-1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j][k-1];
                                    break;
                                case matrice[j-1][k-1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j-1][k-1];
                                    break;
                                case matrice[j+1][k-1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j+1][k-1];
                                    break;
                                case matrice[j-1][k+1]:
                                    compteur++;
                                    motCorriger[i] = matrice[j-1][k+1];
                                    break;
                                default:
                                    break;
                            }
                        }
                    }   
                }
                else{
                    motCorriger[i] = mot[i];
                }
            return motCorriger; // retourne le nombre d'erreurs entre le mot saisie et la matrice clavier
        }
    }
}