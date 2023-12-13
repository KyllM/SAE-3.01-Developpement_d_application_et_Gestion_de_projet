export class Mot{
    constructor(taille, description){
        this.taille = taille; // taille du mot (str)
        this.description = description; // descrpition du mot (str)
    };

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
}