const passport = require('passport')
const { MongooseDocument } = require('mongoose')
const localStrategy = require('passport-local').Strategy

const User = require('../models/user')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //match user's email
    const user = await User.findOne({email})
    if (!user){
        return done(null, false, {message: 'Not user found'})
    } else {
        //match user's password
        const match = await user.matchPassword(password)
        if(match){
            return done(null, user)
        } else{
            return done(null, false, {message: 'Incorrect password'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) =>{
        done(err, user)
    })
})