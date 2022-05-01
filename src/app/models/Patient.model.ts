import { AdressePatient } from "./AdressePatient.model";
import { FicheMedicale } from "./FicheMedicale.model";

export class Patient{
        _id: string;
        nom: string;
        prenom: string;
        email: string;
        sexe: { type : string, default:"femme"};
        date_naissance: Date;
        lieu:string;
        adresse:  AdressePatient;
        phone:string;
        taille: string;
        poids:string;
        maladie:string;
        desc_patient: string;
        fiche_medicale: FicheMedicale;
      
    
}