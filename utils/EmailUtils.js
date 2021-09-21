

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
            to: recipientEmail, // Change to your recipient
            from: process.env.EMAIL_KEY, // Change to your verified sender
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

    async sendPolicyDocumentsEmail(recipientEmail,
                                  subject,
                                  body,
                                  policyDocuments) {//Each document is off form {url: "url", filename:""}
        try {
            const msg = {
                to: recipientEmail,
                from: process.env.EMAIL_KEY,
                subject: subject,
                text: body,
                attachments: [
                    /*{

                        content: stUrl,
                        filename: 'MotorSticker.pdf',
                        type: 'application/pdf',
                        disposition: 'attachment',
                        content_id: 'sticker_id',
                    },*/
                ],
            };

             for (const urlObj of policyDocuments) {
                msg.attachments.push({
                    content:  await getBase64(urlObj.url),
                    filename: urlObj.filename,
                    type: 'application/pdf',
                    disposition: 'attachment',
                    content_id: 'sticker_id',
                })

            }
            //const stUrl = await getBase64(stickerUrl);
            //console.log(stUrl);

            await sgMail.send(msg);

            console.log(`Policy documents emailed to: ${recipientEmail}`);


        } catch (e) {
            console.error(e.response.body);
        }


    }
};