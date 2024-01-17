/**
 * @file Artiste.js
 * @brief Fichier principal du projet
 * @version 1.0
 * @date 2021-05-18
 * @author MaxMontouro 
 */

//------------------------------------
//           Classe Artiste
//------------------------------------

import { Donnee } from "./Donnee.js";
class Artiste extends Donnee {
    
        //CONSTRUCTEUR
        /**
         * @brief constructeur de la classe Artiste
         * @param {*} langue 
         * @param {*} photo 
         */
        constructor(langue, photo){
            super();
            this.setLangue(langue);
            this.setPhoto(photo);
        }
    
        //ENCAPSULATION langue&photo
        /**
         * @brief set de la langue de l'artiste
         * @param {*} uneLangue 
         */
        setLangue(uneLangue){
            this.langue = uneLangue;
        }

        /**
         * @brief set de la photo de l'artiste
         * @param {*} unePhoto 
         */
        setPhoto(unePhoto){
            this.photo = unePhoto;
        }
        /**
         * @brief get de la langue de l'artiste
         * @returns la langue de l'artiste
         */
        getLangue(){
            return this.langue;
        }
        /**
         * @brief get de la photo de l'artiste
         * @returns la photo de l'artiste
         */
        getPhoto(){
            return this.photo;
        }
}