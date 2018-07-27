const profileRouter = require('express').Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect('/auth/login');
  } else {
    //if logged in
    next();
  }
}

profileRouter.get('/', authCheck, (req, res) => {
  //res.send('You are loggedin, this is your profile - ' + req.user.userName);
  res.render('profile', {
    user: req.user
  });
})

module.exports = profileRouter;