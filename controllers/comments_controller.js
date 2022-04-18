const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailers');
const commentEmailWorker=require('../workers/comment_email_worker');
const queue = require('../config/kue');
const Like=require('../models/like');


module.exports.create=async function(req,res){
    
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });

            post.comments.push(comment);
            post.save();

            // console.log('before populate comment',comment);  used this line for self understandings but then commented out
            comment = await comment.populate('user','name email password').execPopulate();
            // console.log('after populate comment',comment); used this line for self understandings but then commented out

             
            // used this line for self understandings ......send emails directly and not queing them
            commentsMailer.newComment(comment);
            
            //we can also send email by first queing it and then sending it 
            // let job= queue.create('emails', comment).save(function(err){
            //     if(err){
            //         console.log('error in creating a queue',err);
            //         return;
            //     }

            //     console.log('job enqueued',job.id);
            // })

            if (req.xhr){
                
    
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success','Successfully Added Comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}



module.exports.destroy=async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);

        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
            
            //deleting all the likes associted to that comment
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            // send the comment id which was deleted back to the views
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            

            req.flash('success','Successfully Deleted Comment');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
    
}