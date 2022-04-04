var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ekaly.comm@gmail.com',
        pass: 'root123456789'
    }
});

var mailOptions = {
    from: 'ekaly.comm@gmail.com',
    to: 'nfrandriamihanta@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});