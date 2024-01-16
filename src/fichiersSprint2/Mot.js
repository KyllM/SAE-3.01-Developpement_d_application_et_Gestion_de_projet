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
    
    corrigerClavier(distanceErreur) {
        /**
         * @brief : méthode qui permet de comparer un mot saisi au clavier
         *          et de renvoyer un mot corrigé avec un nombre d'erreurs inférieur à distanceErreur
         * @param : distanceErreur : nombre d'erreurs maximal autorisé
         * @return : listePertinante : tableau de mots corrigés
         */
    
        // Initialisations
        let listePertinante = {}; // Tableau de mots corrigés
    
        // Parcours des catégories du dictionnaire
        for (const categorie in dictionnaireJSON) {
            if (dictionnaireJSON.hasOwnProperty(categorie)) {
                // Parcours des éléments de chaque catégorie
                for (const elementCategorie of dictionnaireJSON[categorie]) {
                    // Comparaison avec le mot saisi
                    if (elementCategorie.length === this.getTaille()) {
                        const comparaison = this.comparerMots(elementCategorie, this.getDescription(), distanceErreur);
    
                        // Si la comparaison est valide, ajouter le mot corrigé à la liste
                        if (comparaison.isValid) {
                            listePertinante[elementCategorie] = comparaison.motCorrige;
                        }
                    }
                }
            }
        }
    
        return listePertinante;
    }
    
    comparerMots(motJSON, motSaisi, distanceErreur) {
        /**
         * @brief : comparer deux mots caractère par caractère
         * @param : motJSON : mot du dictionnaire à comparer
         * @param : motSaisi : mot saisi par l'utilisateur
         * @param : distanceErreur : nombre d'erreurs maximal autorisé
         * @return : objet avec isValid (booléen) et motCorrige (mot corrigé)
         */
    
        let compteur = 0;
        let motCorrige = "";
    
        // Comparaison caractère par caractère
        for (let i = 0; i < motSaisi.length; i++) {
            // Récupération des coordonnées de la lettre dans la matrice clavier
            const indiceX = this.recupererCoordonnesLettre(motSaisi[i][0]);
            const indiceY = this.recupererCoordonnesLettre(motSaisi[i][1]);
    
            // Comparaison avec la matrice clavier
            if (motSaisi[i] !== matrice[indiceX][indiceY] && motJSON[i] !== matrice[indiceX][indiceY]) {
                for (let j = indiceX; j < matrice.length; j++) {
                    for (let k = indiceY; k < matrice[j].length; k++) {
                        //on regarde si les coordonnees de la lettre recupérée dans la matrice clavier sont les bonnes par rapport au mot saisi
                        switch (matrice[indiceX][indiceY]) {
                            case matrice[j + 1][k]:
                                compteur++;
                                break;
                                motCorrige.push(matrice[j + 1][k]);
                            case matrice[j][k + 1]:
                                compteur++;
                                motCorrige.push(matrice[j][k + 1]);
                                break;
                            case matrice[j + 1][k + 1]:
                                compteur++;
                                motCorrige.push(matrice[j + 1][k + 1]);
                                break;
                            case matrice[j - 1][k]:
                                compteur++;
                                motCorrige.push(matrice[j - 1][k]);
                                break;
                            case matrice[j][k - 1]:
                                compteur++;
                                motCorrige.push(matrice[j][k - 1]);
                                break;
                            case matrice[j - 1][k - 1]:
                                compteur++;
                                motCorrige.push(matrice[j - 1][k - 1]);
                                break;
                            case matrice[j + 1][k - 1]:
                                compteur++;
                                motCorrige.push(matrice[j + 1][k - 1]);
                                break;
                            case matrice[j - 1][k + 1]:
                                compteur++;
                                motCorrige.push(matrice[j - 1][k + 1]);
                                break;

                            default:
                                // Si la lettre n'est pas corrigée, utiliser le caractère actuel
                                motCorrige.push(motSaisi[i]);
                                break;
                        }
                    }
                }
    
            // Si le compteur est supérieur ou égal à distanceErreur, sortir de la boucle
            if (compteur > distanceErreur) {
                break;
            }
        }
    
        // Retourner un objet avec les résultats de la comparaison
        return {
            isValid: compteur < distanceErreur, // La comparaison est valide si le compteur est inférieur à distanceErreur
            motCorrige: motCorrige,
        };
    }
}
    

    verifierCoherence(mot, motPertinant, tableau){
        /**
         * @param {string} mot - Mot saisi par l'utilisateur
         * @param {string} motPertinant - Mot corrigé pertinent
         * @param {Array} tableau - Tableau de mots pertinents
         * @return {string} motLePlusPertinant - Mot le plus pertinent filtré par la saisie clavier et la distance de Damerau-Levenshtein
         */
    
        let motLePlusPertinant;
    
        if (tableau.includes(motPertinant)) {
            motLePlusPertinant = motPertinant;
        } else {
            // Mettez à jour motLePlusPertinant en utilisant la distance de Damerau-Levenshtein
            motLePlusPertinant = this.damerauLevenshteinDistance(mot, motPertinant) < 2 ? motPertinant : null;
        }
    
        return motLePlusPertinant;
    }
    
    
}