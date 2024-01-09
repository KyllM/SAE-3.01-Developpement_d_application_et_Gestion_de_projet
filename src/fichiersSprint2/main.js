/**
 * @file main.js
 * @brief Fichier principal du projet
 * @version 1.0
 * @date 2021-05-18
 * @author MaxMontouro 
 */

//INCLUSION DES FICHIERS JS
import { recuperationJSON } from "./Donnee.js";
//import {Mot} from "./Mot.js";
//import {Vinyle} from "./Vinyle.js";

//------------------------------------
//              Main
//------------------------------------

async function main() {
    console.log("Bienvenue dans le projet Vinylog");
    console.log("---------------------------------------------------");
    console.log("---------------------------------------------");

    try {
        let dictionnaireJSON = await recuperationJSON();
        console.log(dictionnaireJSON);

        // Continuez avec le reste de votre code ici
        /*
        var mot = getElementById("mot");
        mot = new Voisin(mot);

        mot.damaraulevenshteinDistance();
        mot.explorerCombinaison();
        */
    } catch (error) {
        console.error("Une erreur s'est produite dans le main :", error);
    }
}

main();