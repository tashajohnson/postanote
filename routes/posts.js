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
    // top: req.body.top,
    // left: req.body.left,
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

router.post('/update/:id', function(req, res) {
  Postnote.findById(req.params.id, function(err, post) {
    post.title = req.body.title,
    post.content = req.body.content, 
    post.color = req.body.color,
    post.top = req.body.top,
    post.left = req.body.left,
    post.updated_at = Date.now();
    post.save( function(err, post) {
      res.redirect('/posts');
    });
  });
});

router.post('/edit/:id', function(req, res) {
  Postnote.findById(req.params.id, function(err, post) {
    post.top = req.body.top,
    post.left = req.body.left,
    post.updated_at = Date.now();
    post.save( function(err, updatedPost) {
      res.send(updatedPost);
    });
  });
});

router.post('/postPosition_template', function(req, res) {
  var post = req.body;
  res.render('post', {id: post.id, title: post.title, content: post.content, color: post.color, top: post.top, left: post.left})
});
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