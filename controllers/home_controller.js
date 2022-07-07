const Post = require('../models/post');
const User=require('../models/user');
const db=require('../config/mongoose');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
require('dotenv/config');


module.exports.home = async function(req, res){

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
        .populate({
            path:'user',
            populate:{
                path:'friends'
            }
        })
        .populate('likes');
        //populated the likes and comments of each post and comment

        let users= await User.find({});
    
        return res.render('home', {
            title: "Home",
            posts: posts,
            all_users:users
        });
    }catch(err){
        // console.log('Error',err);
        return;
    }
    
}


module.exports.deleteAccount = async function(req,res){

    try{
        
    }catch(err){
        // console.log('Error in deleteing Account',err);
        return;
    }
}