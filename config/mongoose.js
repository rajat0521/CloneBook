const mongoose = require('mongoose');
const env=require('./enviourment');


mongoose.connect(`mongodb+srv://rajat_2103:rajatbarwal@cluster0.gincy.mongodb.net/${env.db}?retryWrites=true&w=majority`,{ useNewUrlParser: true });
// 2k19pe049032002

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
