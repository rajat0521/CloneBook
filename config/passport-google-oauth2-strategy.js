// const passport=require('passport');
// const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
// const crypto=require('crypto');
// const User=require('../models/user');

// //tell passpoprt to use a new staetgy for google login
// passport.use(new googleStrategy({
//         clientID:"686308977571-rf5j452nvbef3ft4si2b6jej86ubo206.apps.googleusercontent.com",
//         clientSecret:"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",
//         callbackURL:"http://localhost:8000/users/auth/google/callback"
//     },
    
//     function(accessToken, refeshToken, profile, done){
//         User.findOne({email:profile.emails[0].value}).exec(function(err, user){
//             if(err){console.log('error in google startegy passport', err);return;}

//             // console.log(profile);
            
//             //if found,set this user as req.user
//             if(User){
//                 return done(null, user);
//             }else{
//                 //if not found, create this user and set this as req.user
//                 User.create({
//                     name: profile.displayName,
//                     email: profile.emails[0].value,
//                     password: crypto.randomBytes(20).toString('hex')
//                 },function(error,userr){
//                     if(error){console.log('error in google startegy passport', err);return;}
                     
//                     return done(null, userr);
//                 })
//             }
//         });
//     }

// ));

// module.exports=passport;
















const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env=require('./enviourment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({

        clientID      :    env.google_client_id,
        clientSecret  :    env.google_client_secret,
        callbackURL   :    env.google_call_back_url
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;
