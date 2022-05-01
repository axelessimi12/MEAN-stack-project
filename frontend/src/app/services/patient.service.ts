import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { MailModel } from 'src/app/models/MailModel.model';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  url: string ="http://localhost:3000/patient";
  urll: string ="http://localhost:3000/fiche_med";


  constructor(private http: HttpClient) { }

  getPatients(){
    //console.log("in get service")
    return this.http.get<Patient[]>(this.url);
  }

  searchPatient(nom: string){
    //console.log("in search service")
    return this.http.get<Patient[]>(this.url.concat('/search/?nom=').concat(nom));
  }

  searchPatientById(id: string){
    //console.log("in search service")
    return this.http.get<Patient>(this.url.concat('/searchbyid/').concat(id));
  }

  addPatient(data: Patient){
    console.log("DATA*************" + data);
    return this.http.post(this.url.concat('/ajouter'), data);
  }

  deletePatient(id: any) {
    return this.http.get(this.url.concat('/delete/').concat(id));
  }

  updatePatient(id: any,data: Patient) {
    return this.http.post(this.url.concat('/update/').concat(id), data);
  }

  maillerPatient(id: any,data: MailModel) {
    return this.http.post(this.url.concat('/mailler/').concat(id), data);
  }

  PDFPatient(id: any) {
    return this.http.get(this.urll.concat('/pdf/').concat(id));
  }

}
