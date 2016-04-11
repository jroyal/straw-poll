var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://159.203.112.191:32770/polls');

// create a schema
var pollSchema = new Schema({
    _id: String,
    question: String,
    answers: [String]
});

// we need to create a model using it
var Poll = mongoose.model('Poll', pollSchema);

// make this available to our users in our Node applications
module.exports = Poll;
