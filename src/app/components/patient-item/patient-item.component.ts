import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-patient-item',
  templateUrl: './patient-item.component.html',
  styleUrls: ['./patient-item.component.css']
})
export class PatientItemComponent implements OnInit {

  @Input() patient: Patient | undefined;

  constructor(private patientService: PatientService,  private router: Router) { }

  ngOnInit(): void {
  }

  supprimerPatient(id: string | undefined){
      return this.patientService.deletePatient(id).subscribe(
        () => window.location.reload()
        
      );
  }

  goToUpdatePatient(id: string | undefined){
    this.router.navigate(['/updatePatient', {identifiant:id}]);
  }

  goToMaillerPatient(id: string | undefined){
    this.router.navigate(['/maillerPatient', {identifiant:id}]);
  }

  PDFPatient(id: string | undefined){
    return this.patientService.PDFPatient(id).subscribe(
      () => window.location.reload()
      
    );
}

goToDetailsPatient(id: String | undefined){
  this.router.navigate(['/detailsPatient', {identifiant:id}]);
 // return this.patientService.deletePatient(id).subscribe();
}




}
