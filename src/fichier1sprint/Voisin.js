import { Donnee } from "./donnee";
import { Mot } from "./Mot"
import { matrice } from "./donnee";

class Voisin extends Donnee {
    constructor(nom){
        super(Mot);
        this.nom = nom;
    }

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


}