import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-details-patient',
  templateUrl: './details-patient.component.html',
  styleUrls: ['./details-patient.component.css']
})
export class DetailsPatientComponent implements OnInit {
  id: string | null;
  patient: Patient;



  constructor( private route: ActivatedRoute, private patientService: PatientService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('identifiant');
    if(this.id == null)
          this.id='vide';

      console.log(this.id);

    
    this.patientService.searchPatientById(this.id).subscribe(
      (data: Patient) => 
            {
              console.log('data'+data);
              this.patient=data

            }        );
  }

}
