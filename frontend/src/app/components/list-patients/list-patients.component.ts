import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';


@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

  listPatients: Patient[];

  constructor(private patientService: PatientService) { 
   // window.location.reload();
  }


  ngOnInit(): void {
    this.patientService.getPatients().subscribe(
      (data: Patient[]) => 
        this.listPatients=data);
  }

}
