var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FicheMedicale = new Schema({
    fumeur: String,
    maladie_infantiles:[""],
    antecedent_medicaux: [""],
    antecedent_chirugicaux: [""],
    allergies: [""],
    intolerance_medicamenenteuses: [""],
    vaccins: [""],
    last_consultation: String

});


module.exports = mongoose.model('FicheMedicale',FicheMedicale);