var mongoose = require('mongoose');
const { Stream } = require('pdfkit');
var Schema = mongoose.Schema;

var MailModel = new Schema({
    from: {type:String, default:"hireogroup@gmail.com"},
    to: String,
    subject: String,
    message: String,
});

module.exports = mongoose.model('MailModel',MailModel);