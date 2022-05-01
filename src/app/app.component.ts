import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PharMaxWeb';
  nom='';
  constructor( private router: Router) { }



  goTosearchPatient(id: string ){

    console.log('NOM SEARCH'+this.nom)
      id=this.nom;
    this.router.navigate(['/searchPatient', {recherche:id}]);
  }
}
