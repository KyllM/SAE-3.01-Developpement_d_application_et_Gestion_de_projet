/**
 * @fileoverview  Fichier contenant la classe Mot
 * @version 1.0
 * @since 2021-05-18
 * @module Mot
 * @author MaxMontouro
 */

//INCLUSION DES FICHIERS JS
import {Donnee} from "./Donnee.js";
import {matrice} from "./Donnee.js";
import {dictionnaireJSON} from "./Donnee.js";

//------------------------------------
//      Classe Mot
//------------------------------------

export class Mot{

    //ATTRIBUTS
    unMot = new Mot();
    ArrayDonnee = new Array(); //tableau de mot
    listeMotAvecDamerauLevenshteinsteMot = new Array(); //tableau de mot avec distance de Damerau-Levenshtein < 2

    //CONSTRUCTEUR
    /**
     * @brief constructeur de la classe Mot
     * @param {*} taille 
     * @param {*} description 
     */
    constructor(taille, description){
        setMot(taille, description);
    };

    //ENCAPSULATION
    /**
     * 
     * @brief get&set des attributs  nom, mot, ArrayDonnee
     */

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
    
    ajouterTableau(mot, listeMotAvecDamerauLevenshteinsteMot){
            if(this.damarauLevenshteinDistance(mot, this.getMot()) < 2){
                listeMotAvecDamerauLevenshteinsteMot.push(mot);
            }
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
    
    correctionClavier(mot){
        /** 
        *  @brief : methode qui permet de comparer un mot saisie au clavier et permet d'en ressortir un mot corrige avec un nombre d'erreur < 2
        *  @param : mot : string 
        *  @return : motPertinant 
        */
    
        var compteur = 0; //compteur de faute
        let motPertinant = ""; //mot corriger
    
        //on parcours le mot saisie
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
            //on regarde si la taille de motPertinant et mot sont les mêmes sinon on ajoute à motPertinant la fin de mot
            if(motPertinant.length != mot.length){
                for(let i = motPertinant.length; i < mot.length; i++){
                    motPertinant[i] = mot[i];
                }
            }
    
            return motPertinant; // retourne le mot corriger avec un nombre d'erreur < 2
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