const express = require('express');
const router = express.Router();
const passport=require('passport');
const Post=require('../models/post');
const multer=require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/posts')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })



const postsController=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication , upload.single('image') , (req, res, next) => {

    var obj = {
        content: req.body.content,
        user: req.user._id,
        img: 'uploads/posts/'+req.file.filename
    }
    Post.create(obj, (err, item) => {
        if (err) {
            // console.log(err);
        }
        else {
            // item.save();
            res.redirect('back');
        }
    })
    
});

// router.post('/create',passport.checkAuthentication, postsController.create);


router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);


module.exports=router;