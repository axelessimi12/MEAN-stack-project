var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var adressePatient = require('../models/AdressePatient.model');
var FicheMedicale = require('../models/FicheMedicale.model');


var Patient = new Schema({
    nom: String,
    prenom: String,
    email: String,
    sexe: { type : String, default:"femme"},
    date_naissance: Date,
    lieu:String,
    adresse: mongoose.model('AdressePatient').schema,
    phone:String,
    taille: String,
    poids:String,
    maladie:String,
    desc_patient: String,
    fiche_medicale: mongoose.model('FicheMedicale').schema,
  

});


module.exports = mongoose.model('patient',Patient);