var express = require('express');
var router = express.Router();
const fs = require("fs");
const PDFDocument = require("pdfkit");
const IMG_URL="C:/Users/axele/OneDrive/Bureau/4IoSys/pharmax/backend/public/images/";
var FicheMedicale = require('../models/FicheMedicale.model');
var Patient = require('../models/patient.model');

/* GET FICHE MEDICALES listing. */
router.get('/', function (req, res, next) {

  FicheMedicale.find(function (err, doc) {
      if (err) {
          console.error(err);
          return;
      }

      res.render('list_fichesMed',
          {
              title: "liste fiches",
              list_de_fichesMed: doc
          });

  })
});



/* GET Fiche medicale adding. */
router.get('/ajouter/:id', function(req, res, next) {

  Patient.findById({ _id: req.params.id }, function (err, doc) {  
    //recherche du patient
    if (err)
        console.log(err);
    else{
      res.render('ajout_FicheMedicale',
      { 
        title: 'Ajout d une Fiche medicale' ,
        patient: doc,
       });
    }
  });

});


/* POST Fiche medicale adding. */
router.post('/ajouter/:id', function (req, res, next) {
  
  var fiche= new FicheMedicale(req.body);  
  //recup des donnes du formulaire fiche
  Patient.findById({ _id: req.params.id }, function (err, doc) {  //recherche du patient
    if (err)
        console.log(err);
    else{
      doc.fiche_medicale=fiche;  //affectation de la fiche

      doc.save().then(item => {
        console.log("Fiche medicale patient added  successfully");
     })//sauvegarde du patient + fiche

    }

  fiche.save().then(item => {
     console.log("Fiche medicale added  successfully");
      res.redirect('/patient');
  })
  .catch(err => {
      res.status(400).send("unable to saved Fiche medicale to database");
  });
});

});




/*****************GET  Fiche  Medicale deleting */
router.get('/delete/:id', function (req, res, next) {
  FicheMedicale.findById({ _id: req.params.id }, function (err, doc) {
      if (err)
          console.log(err);
      doc.remove(function (err, comment) {
          res.redirect('/fiche_med');

      })

  });
});


//GET Patient updating
router.get('/update/:id', function (req, res, next) {
  Patient.findById({ _id: req.params.id }, function (err, doc) {
      if (err)
          console.log(err);
      console.log("fiche medicale patient "+doc.fiche_medicale);
      res.render('edit_FicheMed',
          {
              title: "Mise a jour fiche medicale ",
              patient: doc
          });

  })
});


//POST Patient updating
router.post('/update/:id', function (req, res, next) {
  var fiche =new FicheMedicale(req.body);
  Patient.findById({ _id: req.params.id }, function (err, doc) {
      if (err)
          console.log(err);
      else{   
        doc.fiche_medicale.maladie_infantiles.push(fiche.maladie_infantiles[0]);
        doc.fiche_medicale.allergies.push(fiche.allergies[0]) ;
        doc.fiche_medicale.vaccins.push(fiche.vaccins[0]);
        doc.fiche_medicale.last_consultation = fiche.last_consultation;
        console.log("fiche medicale patient222 "+doc.fiche_medicale);
    }

      doc.save(function (err, todo) {
          if (err) {
              res.status(500).send(err)
          }
          console.log("succesfully update fiche in patient")
          //res.redirect('/patient');
      });

      FicheMedicale.findById({ _id:  doc.fiche_medicale._id}, function (err, result) {
        if (err)
            console.log(err);
        else{ 
          console.log("result "+result );
          result.fiche_medicale=doc.fiche_medicale;/***********************A AMELIORER************* */
          console.log("result2 "+result );
          console.log("fiche medicale patient333 "+doc.fiche_medicale);
          result.save(function (err, todo) {
            if (err) 
                res.status(500).send(err)
            console.log("succesfully update fiche")
            res.redirect('/patient');
        });
        }
      });




  })//modif sur la fiche du patient terminee


});



/* GET FICHE MEDICALES printed. */
router.get('/pdf/:id', function (req, res, next) {

  Patient.findById({ _id: req.params.id }, function (err, result) {
    if (err){
        console.log(err);
          return;
      }
      
  const lorem = '  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus dignissim erat. Ut nec tortor nunc. Aliquam venenatis ut erat id elementum. Maecenas bibendum odio sed ultrices pulvinar. Phasellus sit amet elit blandit, facilisis metus sollicitudin, venenatis nulla. Suspendisse ipsum odio, accumsan id libero tincidunt, hendrerit efficitur enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean maximus tempor nunc, eu pulvinar nisi volutpat quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent augue purus, imperdiet ac enim sed, lacinia gravida purus. Vestibulum sit amet tempor metus.' +
 ' Donec varius varius commodo. Suspendisse enim lorem, convallis at lacus ut, dignissim condimentum orci. Cras ornare egestas diam, in blandit dolor gravida quis. Aenean convallis tristique libero. Integer sit amet fermentum sem. Mauris faucibus odio ac dolor blandit suscipit. Donec volutpat quam dapibus orci euismod, luctus mollis diam iaculis. Vestibulum nec arcu id purus vehicula ultrices. Vestibulum vel mi porttitor, gravida quam ut, fermentum est. Nunc in ullamcorper ligula. In porttitor sem at nisl rutrum, nec laoreet lectus ultricies.'+
  'Phasellus diam ante, commodo at est sit amet, porta tincidunt lectus. Sed leo velit, vestibulum sed bibendum sit amet, ullamcorper sed ligula. Duis laoreet eros metus. Nulla tempor.'
              // ;Create a document
              const doc = new PDFDocument();
              const nom = "facture.pdf"
              // Saving the pdf file in root directory.
              //doc.pipe(fs.createWriteStream(result.nom.concat(".pdf"))); //sauvegarde avec le nom du patient
              doc.pipe(fs.createWriteStream(nom));

// draw some text
var titre='Informations sur le patient '
doc.fontSize(25).text('PHARMAX the smart pills dispenser ', 100, 80);

// Fit the image in the dimensions, and center it both horizontally and vertically
doc.image(IMG_URL.concat('logo.png'), 175, 80, {fit: [250, 250], align: 'center', valign: 'center'})
   //.rect(430, 15, 100, 100).stroke()

/*Scale the image
doc.image(IMG_URL.concat('logo.png'), 320, 280, {scale: 0.5})
   .translate(260, 150)*/

   //.text('Scale', 320, 265);

// and some justified text wrapped into columns
doc
  .text(titre.concat(result.nom), 100, 300)
  .font('Times-Roman', 13)
  .moveDown()
  .text(lorem, {
    width: 412,
    align: 'justify',
    indent: 30,
    columns: 2,
    height: 300,
    ellipsis: true
  })
  .moveDown()
.text('Docteur Axel Essimi', {
  width: 412,
  align: 'justify',
  indent: 10,
  columns: 2,
  height: 100,
  ellipsis: true,
  bold: true
});

// end and display the document in the iframe to the right
doc.end();



        console.log("pdf generated succesfully");
        res.redirect('/patient');

  })
});


module.exports = router;