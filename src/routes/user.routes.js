const {Router} = require('express')
const router = Router()

const {renderSignUpForm, renderSigninForm, signin, signup, logout} = require('../controllers/user.controller')

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signup)

router.post('/users/signin', signin)

router.get('/users/signin', renderSigninForm)

router.get('/users/logout', logout)

module.exports = router;