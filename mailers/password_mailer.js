const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newPassword = (user) => {
    
    let htmlString=nodeMailer.renderTemplate({email:user.email,id:user._id},'/comments/new_password.ejs');
    
    nodeMailer.transporter.sendMail({
       from: 'www.rajatbarwal@gmail.com',
       to : user.email,
       subject: "Reset password",
       html: htmlString

    }, (err, info) => {
        if (err){
            // console.log('Error in sending mail', err);
            return;
        }
        // console.log('Email sent successfully');
    });
}