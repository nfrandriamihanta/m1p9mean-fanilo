var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ekaly.comm@gmail.com',
        pass: 'root123456789'
    },
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendMail = function sendMail(email, mailContent) {
    var mailOptions = {
        from: 'ekaly.comm@gmail.com',
        to: email,
        subject: mailContent.subject,
        text: mailContent.text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}




