const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {
  res.redirect('/teams/dashboard');
});
router.get('/auth/google', passport.authenticate(
  // Which passport strategy is being used?
  'google',
  {
    // Requesting the user's profile and email
    scope: ['profile', 'email'],
    // Optionally force pick account every time
    prompt: "select_account"
  }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/teams',
    failureRedirect: '/teams'
  }
));
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/teams');
  });
});

module.exports = router;
