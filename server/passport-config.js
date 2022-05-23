   
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;
var dbconnection = require('./db/nanodb');


passport.use('local',new LocalStrategy({
usernameField:'loginid',
passwordField:'password'
},
function (username, password, done) {
    dbconnection.hospitaldb.find({ id: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    });
}
));


passport.serializeUser(function(user, done) {
done(null, user._id);
});

passport.deserializeUser(function(id, done) {
User.findById(id, function(err, user) {
  done(err, user);
});
});