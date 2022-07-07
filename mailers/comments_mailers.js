// const nodeMailer=require('../config/nodemailer');

// //this is another of exporting a method
// exports.newComment = (Comment) => {
//     console.log('inside new comment mailer');

//     nodeMailer.transporter.sendMail({
//         from:'rajat@dtu.ac.in',
//         to : Comment.user.email,
//         subject:"New Comment Published",
//         html: '<h1>Your Comment is now published</h1>'
//     }, (err,info) => {
//         if(err){
//             console.log('Error in sending email');
//             return;
//         }
//         console.log('Message sent', info);
//         return;
//     });
// }











const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    
    nodeMailer.transporter.sendMail({
       from: 'www.rajatbarwal@gmail.com',
       to : comment.user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            // console.log('Error in sending mail', err);
            return;
        }

        // console.log('Message sent', info);
    });
}