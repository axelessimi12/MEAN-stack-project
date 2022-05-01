import { Component, OnInit } from '@angular/core';
import { MailModel } from 'src/app/models/MailModel.model';
import { PatientService } from 'src/app/services/patient.service';
import {ActivatedRoute, Router} from "@angular/router";
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-mailler-patient',
  templateUrl: './mailler-patient.component.html',
  styleUrls: ['./mailler-patient.component.css']
})
export class MaillerPatientComponent implements OnInit {
  mail: MailModel;

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute, private notifService: NotificationsService) { }

  ngOnInit(): void {
    this.mail = new MailModel();
    this.mail.from="pharmaxtunisie@gmail.com";
    this.mail.to="pharmaxtunisie@gmail.com";
  }

  maillerPatient(){
    var id=this.route.snapshot.paramMap.get('identifiant');
    this.patientService.maillerPatient(id,this.mail).subscribe();
    console.log(this.mail);
    this.onSuccess("Envoi du mail");
    setTimeout(()=>{
      this.router.navigateByUrl('/listPatient');
 }, 3200);
  
  }

  onSuccess(message: String){
    console.log("Dans la fonction onSuccess");
    this.notifService.success('Success',message,{
      position:['bottom', 'right'],
      timeOut:3000,
      animate:'fade',
      showProgressBar: true
    })
  }
  
  onError(message: String){
    this.notifService.error('Error',message,{
      position:['bottom', 'right'],
      timeOut:2000,
      animate:'fade',
      showProgressBar: true
    });
  }

}
