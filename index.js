const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');



// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


//JWT-json web tokens ....they are used for authentication purpose or authorization purpose
//which means a user can not go to profile page without login and stuff like that
const passportJWt = require('./config/passport-jwt-strategy');


//pssport google auth 2 strategy is used to verify the user or it can be used to login with google
//it helps in signinig up or signing in with the helpl of google
const passportGoogle=require('./config/passport-google-oauth2-strategy');


//it is basically the databses connection stuff
const MongoStore = require('connect-mongo');


//SASS-syntaically awesome style sheets in which u can u write css codes very efficiently
//in simply ways it helps to write code in css mor faster and in a cleaner way
// const sassMiddleWare=require('node-sass-middleware');


//flash is a library used to show pop up messages kinda stuff
//like when u sign in or sign out or post something... a message will pop up ans show that u are signed in or signed out or pposted somethig or coomented on something
const flash=require('connect-flash');
//this is basically the flash library's setup in which we set a success and a error code
const customMware=require('./config/middleware');


//setup the chat server to be used with socket.io
//socket.io is used to make chatting engine 
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path=require('path');


//its basically  middleware of express
app.use(express.urlencoded());

//its also a middle ware in which we store some user's information in the form of cookies 
app.use(cookieParser());


//creating the enviourment path
const env=require('./config/enviourment');


//in this we are just connectinng or telling the server to search static files here like css files and imges and java script files in it
app.use(express.static(env.asset_path));
// app.use(express.static('./assets'));

//make the upload path avilable to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//required multer for storing images
var multer = require('multer'); 
var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
var upload = multer({ storage: storage });



// set up the view engine
//all the html files in the ejs are stored in the views folder and will be render when needed
app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the session cookie
//it is used if the user fogets to log out then it will utomatically gets logged out after some time
//or basically we are making a sessin and storing it in th database
app.use(session({
    name: 'codeial',
    //hange the secret before deployment in production mode
    secret: env.session_cookie_key,
    // secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb+srv://rajat_2103:rajatbarwal@cluster0.gincy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            autoRemove:'disabled'
       },
       function(err){
           console.log(err || 'connect mongo db setup');
       }
      )
}));

// passport js is used for authentication and authorization purpose
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/', require('./routes'));


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
