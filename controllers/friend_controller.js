const User=require('../models/user');


module.exports.addFriend = async function(req,res){
    try{
        //we have the ids of both the profile user and the viewer user
        let profileUserId = req.params.profileUserId;
        let viewerUserId = req.params.viewerUserId;
        let friendIndex;
        let isFriends=true;


        //find the profile user and populate its friends
        let profileUser= await User.findById(profileUserId);

        //find the viewer user and populate its friends
        let viewerUser= await User.findById(viewerUserId);


        //lets check if they have friendship or not as connection
        friendIndex=profileUser.friends.findIndex(user=> user == viewerUserId);

        // console.log('friendIndex',friendIndex);

        //  if no friendhip exits then make a friendship
        if(friendIndex==-1){
            viewerUser.friends.push(profileUserId);
            viewerUser.save();
            profileUser.friends.push(viewerUserId);
            profileUser.save();
        }
        else{
            viewerUser.friends.pull(profileUser);
            viewerUser.save();
            profileUser.friends.pull(viewerUser);
            profileUser.save();
            isFriends=false;
        }

        return res.json(200, {
            message: "Request successful!",
            data: {
                isFriends: isFriends
            }
        })



    }catch(err){
        // console.log(err);
        return res.json(500, {
            message: 'Internal Server Error in completing the add friend in friend controller'
        });
    }
}