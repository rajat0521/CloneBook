const User = require('../models/user');

module.exports.chatbox = async function(req, res){


    try{
        let user = await User.findById(req.params.id)
        .populate('friends');

        return res.render('_chat_box', {
            title: 'Chat Box',
            chat_user:user
        });
        
    }catch(err){
        req.flash('error',err);
        // console.log(err);
        return res.redirect('back');
    }


    
    
}