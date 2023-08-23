// const mailjet = require('node-mailjet');


// const transpoter = mailjet.connect(
//     '6799cd39060a714fd14390a954c8e263',
//     'fddd61fb9de2908bab8d7392c6bc6b05')

// module.exports = function sendMail(email, title, body, html, callback) {
//     console.log("email sent " + email)
//     const request = transpoter.post('send').request({
//         FromEmail: 'killingmachinekh@gmail.com',
//         FromName: "Your Todo",
//         Subject: title,
//         'Text-part': body,
//         'Html-part': html,
//         Recipients: [{ Email: email }],
//     })
//     request
//         .then(result => {
//             callback();
//         })
//         .catch(err => {
//             console.log("error", err);
//         })
// }

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "krashank.harfore@ssipmt.com",
        pass: "Ilmfvmaft@12345"
    }
});

module.exports =  {
  sendMailToUser: function sendMail(toMail,html, callback) {

let message = {
    from: "krashank.harfore@ssipmt.com",
    to: toMail,
    subject: "Todo OTP",
    html: html
}
   transporter.sendMail(message, function(err, info) {
    if (err) {
        console.log('error',err);
        callback(false)
    } else {
        console.log("info",info);
        callback(true);
    }
  })
  }
}