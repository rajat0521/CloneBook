const mongoose=require('mongoose');
const User=require('./user');
const Comment=require('./comment');
const multer=require('multer');
const path=require('path');
const IMAGEPATH=path.join('/uploads/posts');
const Like=require('./like');

const postSchema=new mongoose.Schema({
    img:{
        type: String,
        required:true
    },
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



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' ,IMAGEPATH ))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

//static functions
postSchema.statics.uploadImage=multer({storage : storage}).single('img');
postSchema.statics.imagePath=IMAGEPATH;

const Post=mongoose.model('Post',postSchema);
module.exports=Post;