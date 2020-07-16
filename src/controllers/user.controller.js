const passport = require('passport')

const User = require('../models/user')

const userCtrl = {}

userCtrl.renderSignUpForm = (req, res) =>{
    res.render('users/signup')
}

userCtrl.signup = async (req, res) =>{
    const errors = []
    const {name, email, password, confirm_password} = req.body
    if (password != confirm_password){
        errors.push({text: 'Password do not match'})
    }
    if (password.length < 4){
        errors.push({text: 'Password must be at least 4 chars'})
    }
    if (errors.length > 0){
        //renderizar y enviar los errores
       res.render('users/signup', {
           errors,
           name,
           email
       }) 
    } else{
        const emailUser = await User.findOne({email: email})
        if(emailUser){
            req.flash('error_msg', 'The email is already used')
            res.redirect('/users/signup')
        }else{
            const newUser = new User({name, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'register successfully')
            res.redirect('/users/signin')
        }
    }
}


userCtrl.renderSigninForm = (req, res) =>{
    res.render('users/signin')
}

userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})

userCtrl.logout = (req, res) =>{
    //passport function
    req.logout()
    req.flash('success_msg', 'Come back soon!')
    res.redirect('/users/signin')
}

module.exports = userCtrl