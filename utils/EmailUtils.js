

const sgMail = require('@sendgrid/mail');
const axios = require('axios');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function getBase64(url) {
    let res = await axios.get(url, {responseType: 'arraybuffer'});

    const bufferedString = Buffer.from(res.data, 'binary').toString('base64');

    return bufferedString;
}

module.exports = {



    sendEmailWithSendGrid(recipientEmail, subject, body) {

        const msg = {
            to: recipientEmail,
            from: process.env.EMAIL_KEY, 
            subject: subject,
            text: body,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
    },


};