import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeletePatientComponent } from './components/delete-patient/delete-patient.component';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { PatientItemComponent } from './components/patient-item/patient-item.component';
import { ListPatientsComponent } from './components/list-patients/list-patients.component';
import { UpdatePatientComponent } from './components/update-patient/update-patient.component';
import { MaillerPatientComponent } from './components/mailler-patient/mailler-patient.component';
import { DetailsPatientComponent } from './components/details-patient/details-patient.component';
import { SearchPatientComponent } from './components/search-patient/search-patient.component';

const routes: Routes = [
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'patientItem', component: PatientItemComponent },
  { path: 'listPatient', component: ListPatientsComponent },
  { path: 'deletePatient', component: DeletePatientComponent },
  { path: 'updatePatient', component: UpdatePatientComponent },
  { path: 'maillerPatient', component: MaillerPatientComponent },
  { path: 'detailsPatient', component: DetailsPatientComponent },
  { path: 'searchPatient', component: SearchPatientComponent },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
