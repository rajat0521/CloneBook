const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.post('/update/:id',passport.checkAuthentication ,usersController.update);


router.get('/profile/:profileUserId/:visiterUserId',passport.checkAuthentication ,usersController.profile);


router.get('/sign-up', usersController.signUp);
// router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


router.get('/sign-out',usersController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}), usersController.createSession);

//a get request of page of forgot password which shows to enter email and submit the email on which the link is send
router.get('/forgot-password',usersController.forgot_password);

//a post request in which the email will be verified and then a link will be sent to reset password
router.post('/forgot-password-email',usersController.forgot_password_email);

//when the user will open the link then a file will be rendered
router.get('/resetPassword/:id',usersController.resetPassword);

//when the user will enter the new password and the confirm password and then clicks on the submit button then the router will come here
router.post('/resetPassword_update/:id',usersController.resetPassword_update);

module.exports = router; 
