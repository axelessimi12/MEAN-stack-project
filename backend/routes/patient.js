var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var Patient = require('../models/patient.model');
var MailModel = require('../models/MailModel.model');
var AdressePatient = require('../models/AdressePatient.model');
var FicheMedicale = require('../models/FicheMedicale.model');

/* GET Patients listing. */
router.get('/', function (req, res, next) {

    Patient.find(function (err, doc) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log("fiches "+doc.fiche_medicale);
       /* res.render('list_Patients',
            {
                title: "liste Patients",
                list_de_patients: doc
            });*/

            res.json(doc);

    })
});


/* GET Patient adding. */
router.get('/ajouter', function(req, res, next) {
    res.render('ajout_Patient', { title: 'Ajout d un Patient' });
});


/* POST Patient adding. */
router.post('/ajouter', function (req, res, next) {
    var xxx= new Patient(req.body);
    //console.log("adesse0 "+xxx.adresse);
    var adressePatient = new AdressePatient(xxx.adresse);
    xxx.save().then(item => {
       console.log("Patient added  successfully");
        //res.redirect('/patient');
    })
    .catch(err => {
        res.status(400).send("unable to saved Patient to database");
    });

            /**********************sauvegarde de l'adresse du patient*************/;
            //console.log("adresse "+adresse);
            adressePatient.save().then(item => {
               console.log("Adresse patient added  successfully");
               res.redirect('/patient');
            })
            .catch(err => {
                res.status(400).send("unable to saved Adresse patient to database");
            });
    
           /**************************res.send("item saved to database")********** */

 });

/*****************GET  Patient deleting */
 router.get('/delete/:id', function (req, res, next) {
    Patient.findById({ _id: req.params.id }, function (err, doc) {
        if (err)
            console.log(err);
        doc.remove(function (err, comment) {
            res.redirect('/patient');
           /* res.status(400).send({
                message: "deleted successfully!"
              });*/
        })

    })
});


//GET Patient updating
router.get('/update/:id', function (req, res, next) {
    Patient.findById({ _id: req.params.id }, function (err, doc) {
        if (err)
            console.log(err);
        res.render('edit_Patient',
            {
                title: "Mise a jour patient ",
                patient: doc
            });

    })
});


//POST Patient updating
router.post('/update/:id', function (req, res, next) {

    Patient.findById({ _id: req.params.id }, function (err, doc) {
        if (err)
            console.log(err);

        doc.nom = req.body.nom;
        doc.prenom = req.body.prenom;
        doc.email = req.body.email;
        doc.maladie = req.body.maladie;

        doc.save(function (err, todo) {
            if (err) {
                res.status(500).send(err)
            }
            res.redirect('/patient');
        });

    })
});




/* GET send mail to Patient . */
router.get('/mailler/:id', function (req, res, next) {
    Patient.findById({ _id: req.params.id }, function (err, doc) {
        if (err)
            console.log(err);
        res.render('mailer_patient',
            {
                title: "Mailler patient ",
                patient: doc
            });

    })
});


 /* POST send mail to Patient . */
router.post('/mailler/:id', function(req, res, next) {
    var mail= new MailModel(req.body);
    console.log("mail "+ mail);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'pharmaxtunisie@gmail.com',
                  pass: 'pharmaxtunisiepassword'
                }
              });
              
              var mailOptions = {
                from: mail.from,
                to: mail.to,
                subject: mail.subject,
                text: mail.message,
                attachments: [{
                    filename: 'facture.pdf', path:'./facture.pdf' }
                ],
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);

                        /***********journalisation du mail********* */

                        mail.save().then(item => {
                    console.log("mail added  successfully");
                     //res.redirect('/patient');
                 })
                 .catch(err => {
                     res.status(400).send("unable to saved mail to database");
                 });

                 /***********FIN********* */

                  res.redirect('/patient');
                }
    });

});

/* GET search Patient . */
router.get('/search',(req,res,next)=>{
    const searchedField =req.query.nom;
    Patient.find({nom:{$regex:searchedField,$options:'$i'}})
    .then(data=>{
        res.send(data);
    })
})


//GET Patient seraching by id
router.get('/searchbyid/:id', function (req, res, next) {
    Patient.findById({ _id: req.params.id }, function (err, doc) {
        if (err){
            console.log(err);
            return;
        }
        else
            res.json(doc); 
            console.log(doc);
    })
})



module.exports = router;