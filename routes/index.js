var express = require('express');
var Poll = require('../models/poll');
var Moniker = require('moniker');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/poll', function(req, res, next) {
  console.log(req.query);
  var room = req.query.room;
  console.log(room);
  res.redirect("/poll/" + room);
});

router.post('/poll', function(req, res, next) {
    var poll_name = Moniker.choose();
    console.log(req.body)
    var question = req.body.question;
    var answers = req.body.answers;
    console.log(question);
    console.log(answers);
    var poll = new Poll({
        _id: poll_name,
        question: question,
        answers: answers
    })
    poll.save(function(err){
        if (err) throw err;

        console.log("Poll saved successfully")
    });

    res.status(201).redirect("/poll/"+poll_name);
});

router.get('/poll/:poll_name', function(req, res, next) {
    poll_name = req.params.poll_name;
    Poll.findById(poll_name, function(err, polls){
        if (err) throw err;

        if (polls == null){
            res.sendStatus(404)
        }

        console.log(polls)
        console.log(polls.question)

        res.render("open-poll", {question: polls.question, answers: polls.answers} );
    })
});
module.exports = router;
