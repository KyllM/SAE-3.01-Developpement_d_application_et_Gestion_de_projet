/**
 * @file main.js
 * @brief Fichier principal du projet
 * @version 1.1
 * @date 2024-01-15
 * @author MaxMontouro 
 */

//INCLUSION DES FICHIERS JS
import { Mot } from "./Mot.js";
import { dictionnaireJSON } from "./Donnee.js";



//------------------------------------
//              Main
//------------------------------------

class Main {
    constructor() {
        this.init();
    }

    init() {
            console.log("Bienvenue dans le projet Vinylog");
            console.log("---------------------------------------------------");
            console.log("---------------------------------------------");
    
            const formulaire = document.getElementById("demonstration-form");
            formulaire.addEventListener("submit", async (event) => {
                event.preventDefault();
                //initialisation des variables
                const motElement = document.getElementById("mot");
                const motComplet = motElement.value.trim();
                const motValue = motComplet.toLowerCase();
                const distanceSaisieDamarau = document.getElementById("distanceDamarau").value;
                const distanceSaisieClavier = document.getElementById("distanceClavier").value;
                const maximumDistance = Math.max(distanceSaisieDamarau, distanceSaisieClavier);

                // Vérifier si le mot saisi est vide
                if (motValue !== "") {
                    const mot = new Mot(motValue.length, motValue);
                    console.log("mot :", mot.getTaille(), mot.getDescription());
                    
                    /**
                     *              Algorithme de Damerau-Levenshtein
                     **/
                    const listeMotAvecDamerauLevenshteinsteMot = {};
                    //parcours des valeurs                    
                    const dictionnaireValues = Object.values(dictionnaireJSON);
                    // Parcourir les catégories du dictionnaire
                    for (const categorie in dictionnaireValues) {
                        if (dictionnaireValues.hasOwnProperty(categorie)) {
                            // Parcourir les éléments de chaque catégorie
                            for (const elementCategorie of dictionnaireValues[categorie]) {
                                // Parcourir les propriétés de chaque élément
                                for (const prop in elementCategorie) {
                                    // Vérifier si la propriété est une chaîne de caractères
                                    if (elementCategorie.hasOwnProperty(prop)) {
                                        if (typeof elementCategorie[prop] === "string") {
                                            const distance = await mot.damerauLevenshteinDistance(elementCategorie[prop], mot.getDescription());
                                            console.log(elementCategorie[prop], distance);
                                            if (distance <=  distanceSaisieDamarau) {
                                                listeMotAvecDamerauLevenshteinsteMot[elementCategorie[prop]] = distance;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }                                     
                    
                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de Damerau-Levenshtein a fini de tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de Damerau-Levenshtein, les mots suivants sont proches du mot saisi (avec une distance maximum de " + distanceSaisieDamarau+ " ):");
                    console.log("listeMotAvecDamerauLevenshteinsteMot :", listeMotAvecDamerauLevenshteinsteMot);

                    // Affichage des résultats
                    this.afficherResultatsDamarau(listeMotAvecDamerauLevenshteinsteMot, distanceSaisieDamarau);

                    /**
                     *              Algorithme de correction du clavier
                     **/
                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de correction du clavier a commencé à tourner");
                    console.log("---------------------------------------------------");

                    //parcours des valeurs                    
                    // Parcourir les catégories du dictionnaire
                    var listeMotCorrige = {};
                    for (const categorie in dictionnaireValues) {
                        if (dictionnaireValues.hasOwnProperty(categorie)) {
                            // Parcourir les éléments de chaque catégorie
                            for (const elementCategorie of dictionnaireValues[categorie]) {
                                // Parcourir les propriétés de chaque élément
                                for (const prop in elementCategorie) {
                                    // Vérifier si la propriété est une chaîne de caractères
                                    if (elementCategorie.hasOwnProperty(prop)) {
                                        if (typeof elementCategorie[prop] === "string") {
                                            if(elementCategorie[prop].length === mot.getTaille()){
                                                var resultat = mot.corrigerClavier(elementCategorie[prop], mot.getDescription(), distanceSaisieClavier)
                                                listeMotCorrige[elementCategorie[prop]]= resultat[0];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }


                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de correction du clavier a fini de tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de correction du clavier, les mots suivants sont proches du mot saisi (avec une distance maximum de " + distanceSaisieClavier+ " ):   ");
                    console.log("listeClavier :", listeMotCorrige);
                    //affichage dans le navigateur
                    this.afficherResultatsClavier(listeMotCorrige, distanceSaisieClavier);
                    //mot.afficherCombinaison();
            
                    console.log("---------------------------------------------------");
                    console.log("L'algorithme de cohérence a commencé à tourner");
                    console.log("---------------------------------------------------");
                    console.log("D'après l'algorithme de correction de cohérence, les mots suivants sont proches du mot saisi (avec une distance maximum de " + distanceSaisieClavier+ " ):   ");
                    //affichage dans le navigateur
                    var motLePlusPertinant = mot.verifierCoherence(listeMotAvecDamerauLevenshteinsteMot, listeMotCorrige);
                    console.log("motLePlusPertinant :", motLePlusPertinant);
                    console.log(typeof motLePlusPertinant);
                    if(typeof motLePlusPertinant === "object"){
                        this.afficherResultatsCoherenceObjet(motLePlusPertinant, maximumDistance);
                    }
                    else{
                        this.afficherResultatsCoherenceClassique(motLePlusPertinant, maximumDistance);
                    }
                }
            })
        };           
    
    
        afficherResultatsDamarau(listeMotAvecDamerauLevenshteinsteMot, distanceSaisie) {
            const resultatElement = document.getElementById("resultatDamarau");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de damarau-levenshtein est (avec une distance de ${distanceSaisie}): </p> <br>`;
            for (const [mot, distance] of Object.entries(listeMotAvecDamerauLevenshteinsteMot)) {
                resultatElement.innerHTML += `<p>${mot} avec une distance  ${distance} d'erreurs</p>`;
            }
            resultatElement.innerHTML += `<p> Il s'agit des résultats contenu dans le JSON </p> <br>`;
        }

        afficherResultatsClavier(listeClavier, distanceSaisieClavier) {
            const resultatElement = document.getElementById("resultatClavier");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de correction clavier est (avec une distance de ${distanceSaisieClavier}): </p> <br>`;
            for (const [mot, distance] of Object.entries(listeClavier)) {
                if(distance <= distanceSaisieClavier){
                    resultatElement.innerHTML += `<p>${mot} avec une distance maximum d'erreurs de ${distance} </p>`;
                }
            }
            resultatElement.innerHTML += `<p> Il s'agit des résultats contenu dans le JSON </p> <br>`;
        }

        afficherResultatsCoherenceObjet(motLePlusPertinant, distanceSaisie) {
            const resultatElement = document.getElementById("resultatCoherence");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de correction cohérence n'a pas trouvé de résultat cohérent entre les deux algorithmes</p>`;
            for (const [mot, distance] of Object.entries(motLePlusPertinant)) {
                console.log(mot, distance);
                if(distance <= distanceSaisie){
                    resultatElement.innerHTML += `<p>${mot} avec une distance maximum d'erreurs de ${distance}</p>`;
                }
            }
        }
        afficherResultatsCoherenceClassique(motLePlusPertinant, distanceSaisie) {
            const resultatElement = document.getElementById("resultatCoherence");
            resultatElement.innerHTML = "";
            resultatElement.innerHTML += `<p> Le resultat de l'algorithme de cohérence est : </p> <br>`;
            resultatElement.innerHTML += `<p>${motLePlusPertinant} avec une distance maximum d'erreurs de ${distanceSaisie} </p>`;
            resultatElement.innerHTML += `<p> Il s'agit des résultats contenu dans le JSON </p> <br>`;
        }
}


// Création d'une instance de l'application
const vinylogApp = new Main();