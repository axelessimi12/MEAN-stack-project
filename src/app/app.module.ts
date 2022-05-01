import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeletePatientComponent } from './components/delete-patient/delete-patient.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { MaillerPatientComponent } from './components/mailler-patient/mailler-patient.component';
import { DetailsPatientComponent } from './components/details-patient/details-patient.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
    DeletePatientComponent,
    AddPatientComponent,
    PatientItemComponent,
    ListPatientsComponent,
    UpdatePatientComponent,
    MaillerPatientComponent,
    DetailsPatientComponent,
    SearchPatientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
