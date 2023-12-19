function calculerDistancesMots(mot1, mot2) {

    const clavier = {
        a: { x: 0, y: 0 },
        z: { x: 1, y: 0 },
        e: { x: 2, y: 0 },
        r: { x: 3, y: 0 },
        t: { x: 4, y: 0 },
        y: { x: 5, y: 0 },
        u: { x: 6, y: 0 },
        i: { x: 7, y: 0 },
        o: { x: 8, y: 0 },
        p: { x: 9, y: 0 },
        q: { x: 0, y: 1 },
        s: { x: 1, y: 1 },
        d: { x: 2, y: 1 },
        f: { x: 3, y: 1 },
        g: { x: 4, y: 1 },
        h: { x: 5, y: 1 },
        j: { x: 6, y: 1 },
        k: { x: 7, y: 1 },
        l: { x: 8, y: 1 },
        m: { x: 9, y: 1 },
        w: { x: 0, y: 2 },
        x: { x: 1, y: 2 },
        c: { x: 2, y: 2 },
        v: { x: 3, y: 2 },
        b: { x: 4, y: 2 },
        n: { x: 5, y: 2 }
    };

    let distanceTotale = 0;
    for (let i = 0; i < mot1.length; i++) {
        const lettre1 = mot1[i];
        const lettre2 = mot2[i];

        if (lettre1 !== lettre2) {
            const coordonneesLettre1 = clavier[lettre1];
            const coordonneesLettre2 = clavier[lettre2];

            const distanceX = Math.abs(coordonneesLettre1.x - coordonneesLettre2.x);
            const distanceY = Math.abs(coordonneesLettre1.y - coordonneesLettre2.y);

            const distance = distanceX + distanceY;
            distanceTotale += distance;
        }
    }
    //ajout lettre pouvant être voisin 

    console.log("distance physique entre les lettres : ")
    
    return distanceTotale;
    }

const distanceLettres = calculerDistancesMots("foiture", "voiture");
console.log(distanceLettres); // Affiche la distance entre les lettres