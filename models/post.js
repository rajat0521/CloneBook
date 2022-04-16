const mongoose=require('mongoose');
const User=require('./user');

const postSchema=new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //include the arrays of all ids of all comments in this post schema itself
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;