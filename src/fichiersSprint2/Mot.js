/**
 * @fileoverview  Fichier contenant la classe Mot
 * @version 1.0
 * @since 2021-05-18
 * @module Mot
 * @author MaxMontouro
 */

//INCLUSION DES FICHIERS JS
import {Donnee, dictionnaireJSON} from "./Donnee.js";
import {Lettre} from "./Lettre.js";

function fusionnerSansDoublons(objet1, objet2) {
    // Créer un nouvel objet pour stocker les résultats de la fusion
    const resultat = {};

    // Fusionner les clés de l'objet1
    for (const cle in objet1) {
        if (objet1.hasOwnProperty(cle)) {
            resultat[cle] = objet1[cle];
        }
    }

    // Fusionner les clés de l'objet2 qui ne sont pas déjà présentes dans l'objet1
    for (const cle in objet2) {
        if (objet2.hasOwnProperty(cle) && !objet1.hasOwnProperty(cle)) {
            resultat[cle] = objet2[cle];
        }
    }

    return resultat;
}


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
    
    
    corrigerClavier(motJSON, motSaisie, distanceErreur) {
        let listePertinante = {}; // Tableau de mots corrigés
    
        // Parcours des catégories du dictionnaire
        const comparaison = this.comparerMots(motJSON, motSaisie, distanceErreur);
    
        // Si la comparaison est valide, ajouter le mot corrigé à la liste
        return comparaison;

    }
    
    comparerMots(motJSON, motSaisi, distanceErreur) {
        let compteur = 0;
        let motCorrige = "";
    
        // Instance unique de Lettre
        const lettreMotSaisi = new Lettre();
        const lettreMotJSON = new Lettre();
        // Comparaison caractère par caractère
        for (let i = 0; i < motSaisi.length; i++) {
            if (motJSON[i] !== motSaisi[i]) {
                // Mise à jour de l'instance avec la nouvelle lettre
                lettreMotSaisi.setLettre(motSaisi[i]);
                lettreMotJSON.setLettre(motJSON[i]);
                const coordonnees = lettreMotSaisi.getCoordonnees();
                const indiceX = coordonnees[0];
                const indiceY = coordonnees[1];
    
    
                // Comparaison avec la matrice clavier si les lettres sont différentes
                    // Comparaison avec la matrice clavier
                    const matrice = lettreMotSaisi.getMatrice();
    
                    // Déclaration de coordonnées à l'extérieur de la boucle for
                    for (let j = 0; j < matrice.length; j++) {
                        for (let k = 0; k < matrice[j].length; k++) {
                            // Comparaison des coordonnées de la lettre récupérée dans la matrice clavier par rapport au mot saisi
                            if (coordonnees[0] === j && coordonnees[1] === k) {
                                console.log(lettreMotJSON.getDistance(lettreMotSaisi));
                                // Si les coordonnées correspondent, utiliser le caractère actuel
                                motCorrige += motJSON[i];
                                console.log("ajout dans boucle de la lettre ", motJSON[i], " :", motCorrige);
                                compteur+= lettreMotJSON.getDistance(lettreMotSaisi);
                            } else {
                                var lettreMatrice = new Lettre(matrice[j][k]);
                                // Si les coordonnées ne correspondent pas, vérifier les positions adjacentes dans la matrice clavier
                                if (lettreMatrice.getCoordonnees()[0] === coordonnees[0] && lettreMatrice.getCoordonnees()[1] === coordonnees[1]) {
                                    motCorrige += lettreMatrice.getCarac();
                                }
                            }
                        }
                    }
            } else {
                // Si les caractères sont identiques, incrémenter le compteur et ajouter le caractère au mot corrigé
                motCorrige += motJSON[i];
                console.log("ajout de la lettre car identique ", motJSON[i], " au mot ", motCorrige);
            }
        }
        return [compteur, motCorrige];
    }
    
    
    verifierCoherence(listeDamarau, listeClavier) {
        /**
         * @brief : méthode qui permet de vérifier la cohérence entre les deux algorithmes
         * @param : listeDamarau, listeClavier
         * @return {string|object} motLePlusPertinant - Clé ayant la plus petite valeur ou objet contenant toutes les valeurs
         */
    
        const clesClavier = Object.keys(listeClavier);
        const clesDamarau = Object.keys(listeDamarau);
        
        const valeurClavier = Object.values(listeClavier);
        const valeurDamarau = Object.values(listeDamarau);

        const minClavier = Math.min(...valeurClavier);
        const minDamarau = Math.min(...valeurDamarau);
        
        console.log("minClavier : ", minClavier);
        console.log("minDamarau : ", minDamarau);


        if (minClavier < minDamarau) {
            for (let cle in listeClavier) {
                // Vérifier si la valeur correspond à celle recherchée
                if (listeClavier.hasOwnProperty(cle) && listeClavier[cle] === minClavier) {
                  // Retourner la clé si la valeur est trouvée
                  return cle;
                }
              }
        } else if (minClavier > minDamarau) {
            for (let cle in listeDamarau) {
                // Vérifier si la valeur correspond à celle recherchée
                if (listeDamarau.hasOwnProperty(cle) && listeDamarau[cle] === minDamarau) {
                  // Retourner la clé si la valeur est trouvée
                  return cle;
                }
            }
        } else {
          const objetsIdentiques = {};
          for (const cle of clesClavier) {
            if (listeClavier[cle] === listeDamarau[cle]) {
              objetsIdentiques[cle] = listeClavier[cle];
            }
          }
          console.log("objets identiques : ", objetsIdentiques);
          return objetsIdentiques;
        }
    }
    
}