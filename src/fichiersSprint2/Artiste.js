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

class Artiste extends Donnee {
    
        //CONSTRUCTEUR
        constructor(langue, photo){
            this.setLangue(langue);
            this.setPhoto(photo);
        }
    
        //ENCAPSULATION langue&photo
        /**
         * 
         * @brief encapsulation des attributs langue et photo
         */
        setLangue(uneLangue){
            this.langue = uneLangue;
        }

        setPhoto(unePhoto){
            this.photo = unePhoto;
        }

        getLangue(){
            return this.langue;
        }

        getPhoto(){
            return this.photo;
        }
}