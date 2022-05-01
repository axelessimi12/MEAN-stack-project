import { Component, OnInit } from '@angular/core';
import { AdressePatient } from 'src/app/models/AdressePatient.model';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  patient: Patient;
  adresse: AdressePatient;


  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.patient = new Patient();
    this.adresse=new AdressePatient;
  }

  updatePatient(id: string | null){
    id=this.route.snapshot.paramMap.get('identifiant');
    this.patient.adresse=this.adresse;
    this.patientService.updatePatient(id,this.patient).subscribe();
    this.router.navigateByUrl('/listPatient');
  }


}

 

