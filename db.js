var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Postnote = new Schema({
  title: {type: String},
  content: {type: String, required: true},
  color: {type: String},
  updated_at: Date,
});

mongoose.model('Postnote', Postnote);
mongoose.connect('mongodb://localhost/postit');