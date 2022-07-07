const express = require('express');
const router = express.Router();
const friendController=require('../controllers/friend_controller');

router.post('/:profileUserId/:viewerUserId',friendController.addFriend);

module.exports=router;