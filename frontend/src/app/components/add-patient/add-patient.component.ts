import { Component, OnInit } from '@angular/core';
import { AdressePatient } from 'src/app/models/AdressePatient.model';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';
import {Router} from "@angular/router";



@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  patient: Patient;
  adresse: AdressePatient;

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.patient = new Patient();
    this.adresse=new AdressePatient;
  }

  addPatient(){
    this.patient.adresse=this.adresse;
    console.log("PATIENT*************" + this.patient);

    this.patientService.addPatient(this.patient).subscribe();
    this.router.navigateByUrl('/listPatient');
  }

}
