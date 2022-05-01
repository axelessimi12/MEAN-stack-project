var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdressePatient = new Schema({
    pays: String,
    ville: String,
    region: String,
    rue: String,
    zip: String
});

function AdressePatient(pays,ville,region,rue,zip){
this.pays=pays;
this.ville=ville;
this.region=region;
this.rue=rue;
this.zip=zip;
}


module.exports = mongoose.model('AdressePatient',AdressePatient);