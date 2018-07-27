const router = require('express').Router();

//auth login
router.get('/login', (req, res) => {
  res.render('login', {
    user: req.user
  });
});

//auth logout
//auth login
router.get('/logout', (req, res) => {
  //handle with passport
  //res.send('logging out');
  req.logout();
  res.redirect('/');
});


//auth google
// router.get('/google', (req, res) => {
//   //handle with passport
//   res.send('login with google');
// });

const passport = require('passport');
//auth google
//google strategy 
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// router.get('/google', (req, res) => {
//   //handle with passport
//   res.send('login with google');
// });

//callback route for google to redirect to
//
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  //
  //res.send(req.user);
  //res.send('you reched the callback URI')
  //redirect to profile
  res.redirect('/profile/');
})


module.exports = router;