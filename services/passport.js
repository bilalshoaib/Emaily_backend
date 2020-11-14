const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/key');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done)=> {
    done(null, user.id);
});

passport.deserializeUser((id, done)=> {
    User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecretKey,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id})
    .then(existingUSer => {
        if (existingUSer) {
            console.log('we already have this user', existingUSer);
            done(null, existingUSer);
        }
        else {
            new User({googleID: profile.id}).save()
            .then(user => done(null, user))
        }
    });    
})
);