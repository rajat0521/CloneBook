const { MongoGridFSChunkError } = require('mongodb');
const User = require('../models/user');
const path=require('path');
const fs=require('fs');
const Post=require('../models/post');
const Friends=require('../models/friendships');
// const queue=require('../config/kue');
const passwordEmailWorker=require('../mailers/password_mailer');
// const { findById } = require('../models/user');

module.exports.profile = async function(req, res){
    try{ 
        
        let posts = await Post.find({})
        .sort('-createdAt')
        
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            // populate:{
            //     path:"likes"
            // }
        })
        .populate('user')
        .populate('likes');

        let profileUser = await User.findById(req.params.profileUserId);
        let visiterUser = await User.findById(req.params.visiterUserId);
        let friendIndex;
        let buttonName='Remove Friend';


        
        friendIndex= await profileUser.friends.findIndex(user=> user == req.params.visiterUserId);

        if(friendIndex==-1){buttonName='Add Friend';}

        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:profileUser,
            all_posts:posts,
            buttonName : buttonName
        })

    }catch(err){
        req.flash('error',err);
        // console.log(err);
        return res.redirect('back');
    }

    // User.findById(req.params.id,function(err,user){
    //     return res.render('user_profile', {
    //         title: 'User Profile',
    //         profile_user:user
    //     })
    // });
    
    
}

module.exports.update = async function(req, res){
    if(req.user.id==req.params.id){
        
        try{
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('*****Multer Error',err);
                    return;
                }
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){

                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    // }

                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarpath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            }); 


        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('MainPage', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return;}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}
                req.flash('success','Successfully Created Account');
                return res.redirect('/users/sign-in');
            })
            
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Logged In Successfully');
    return res.redirect('/home');
}


//for sign out
module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','Logged out Successfully');
    return res.redirect('/');
}


//forgot password
module.exports.forgot_password=async function(req,res){
    return res.render('user_forgot_password',{
        title: "Reset Password"
    });
    
}

//email will be verified and a link will be sent to the users email to reset the password
module.exports.forgot_password_email=async function(req,res){

    try{
        let email=await User.findOne({email: req.body.email});

        // console.log('Email ->',email);

        if(email){
            passwordEmailWorker.newPassword(email);
            req.flash('success','Email Sent Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error','Incorrect Email');
            return res.redirect('back');
        }



    }catch(err){
        req.flash('error','Error');
        // console.log('Error in sending mail of reset password',err);
        return res.redirect('back');
    }
    
}



//a get request which gets executed when user opens e mail and clicks on the given link and will be redirected to new page where the user an change the older password
module.exports.resetPassword=function(req,res){
    return res.render('users_resetPassword',{
        title: "Reset Password",
        id: req.params.id
    });
}


//now the user has entered the new password and clicked on the submit button  
module.exports.resetPassword_update=async function(req,res){

    try{
        if (req.body.password != req.body.confirm_password){
            req.flash('error','password did not match');
            return res.redirect('back');
        }
        
        let user= await User.findById(req.params.id);
        
        user.password=req.body.password;
        user.save();
        // console.log(user);
 
        console.log('updated');
        req.flash('success','Password Changed Successfully');
        // console.log(req.body);
    
    
        // return res.render('user_sign_in', {
        //     title: "Codeial | Sign In"
        // })

        return res.redirect('/users/sign-in');
    }catch(err){
        req.flash('error','Error in changing Password');
        // console.log('Error in changing password after sending email',err);
        return;
    }

    
}