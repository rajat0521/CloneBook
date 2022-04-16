// const nodemailer=require('nodemailer');
// const ejs=require('ejs');
// const path=require('path');



// let transporter=nodemailer.createTransport({
//     service:'gmail',
//     host:'smtp.gmail.com',
//     port:507,
//     secure:false,
//     auth:{
//         user: 'alchemy.cn18',
//         pass:'codingninjas'
//     }
// });

// let renderedTemplate = (data, trelativePath) =>{
//     let mailHTML;
//     ejs.renderFile(
//         path.join(__dirname, '../views/mailers', relativePath),
//         data,
//         function(err, template){
//             if(err){console.log('error in rendering the template');return;}

//             mailHTML=template;
//         }
//     )

//     return mailHTML;
// }

// module.exports= {
//     transporter: transporter,
//     renderedTemplate: renderedTemplate    
// }

















const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
const env = require('./enviourment');

let transporter = nodemailer.createTransport(env.smtp);


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template',err); return;}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}