const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');


const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');
const profileRoutes = require('./routes/profile-routes');

const app = express();

//set view engine
app.set('view engine', 'ejs');


//use cookie with max age and key for encription
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
//user passport session cokies for login
app.use(passport.session());

//connect to mongoose
try {

  const client = mongoose.connect(keys.mongodb.dbURI, {
    useNewUrlParser: true
  }, (err, db) => {
    if (err) {
      console.error(err);
    } else {
      console.log('connected to mongo');
    }
  });
} catch (e) {
  console.error(e)
}



mongoose.connect(keys.mongodb.dbURI, {
  useNewUrlParser: true
}, (err, data) => {
  if (err) {
    console.error(err);
  }

  console.log('connected to mongo');
});


//set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

//create home routes
app.get('/', (req, res) => {
  res.render('home', {
    user: req.user
  });
})


app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('app listening for request on port = 3000');
})