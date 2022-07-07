const Post = require('../models/post');
const Comment = require('../models/comment');
const Like=require('../models/like');

// module.exports.create = async function(req, res, next){

//     try{
//         // let post = await Post.create({
//         //     img: {
//         //         data: fs.readFileSync(path.join(__dirname + '/uploads/posts' + req.file.filename)), 
//         //         contentType: 'image/png'
//         //     },
//         //     content: req.body.content,
//         //     user: req.user._id
//         // });
        
//         // if (req.xhr){
//         //     return res.status(200).json({
//         //         data: {
//         //             post: post
//         //         },
//         //         message: "Post created!"
//         //     });
//         // }

//         Post.uploadImage(req,res,function(err){
//             if(err){console.log('Multer Error' , err);return;}

//             let post= Post.create({
//                 content: req.body.content,
//                 user: req.user._id,
//                 img : Post.imagePath+'/'+req.file.filename
//             })
//             // if (req.xhr){
//             //     return res.status(200).json({
//             //         data: {
//             //             post: post
//             //         },
//             //         message: "Post created!"
//             //     });
//             // }
//             return res.redirect('back');
//         })

//         req.flash('success', 'Successfully Posted');
//         return res.redirect('back');

//     }catch(err){
//         req.flash('error in creating post : ', err);
//         return res.redirect('back');
//     }
  
// }


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){

            //deleted all the likes and comments associated to that post
            await Like.deleteMany({likeable: post, onModel:'Post'});
            await Like.deleteMany({_id: {$in : post.comments}});


            post.remove();

            await Comment.deleteMany({post: req.params.id});


            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}




module.exports.create=function(req,res){
    Post.uploadImage(req,res,function(err){
        if(err){console.log('Multer Error' , err);return;}
        let post= Post.create({
            content: req.body.content,
            user: req.user._id,
            img : Post.imagePath+'/'+req.file.filename
        })
        req.flash('success', 'Successfully Posted');
        return res.redirect('back');
    })
}