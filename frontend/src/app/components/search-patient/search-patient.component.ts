import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/models/Patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css']
})
export class SearchPatientComponent implements OnInit {

  listPatients: Patient[];

  constructor(private patientService: PatientService,private route: ActivatedRoute) { 
  
  }



  ngOnInit(): void {
    var recherche=this.route.snapshot.paramMap.get('recherche');
    if(recherche == null)
          recherche='vide';
    
    this.patientService.searchPatient(recherche).subscribe(
      (data: Patient[]) => 
        this.listPatients=data);
  }

}
