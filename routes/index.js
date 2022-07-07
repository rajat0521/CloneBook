const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const mainPageController = require('../controllers/main_controller');

console.log('router loaded');


router.use('/addFriend', require('./friend'));
router.use('/chat', require('./chat'));
router.get('/home', homeController.home);
router.get('/', mainPageController.mainPage);
router.get('/deleteAccount',);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));
router.use('/likes',require('./likes'));

router.use('/api',require('./api'));


// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;