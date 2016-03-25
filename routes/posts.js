var express= require('express');
var mongoose = require('mongoose');
var Postnote = mongoose.model('Postnote');
var router = express.Router();


// Get a note
router.get('/', function(req, res) {
  Postnote.find( function( err, posts) {
    res.render('posts', { posts: posts });
  });
});


// Post a note
router.post('/', function(req, res) {
  new Postnote({
    title: req.body.title,
    content: req.body.content,
    color: req.body.color,
    updated_at: Date.now()
  }).save( function(err, posts) {
    res.redirect('/posts');
  });
});


// Get specific note

router.get('/:id', function(req, res) {
  Postnote.findById(req.params.id, function(err, post) {
    res.render('post', {post: post});
  });
});

// Edit a note
// ajax call would go to this route
// get the data from the ajax call
// update the database
// card will have location data on it

// Delete a note
router.post('/:id', function(req, res) {
  Postnote.findById(req.params.id, function(err, post) {
    post.remove( function(err, post) {
      res.redirect('/posts');
    });
  });
});

module.exports = router;