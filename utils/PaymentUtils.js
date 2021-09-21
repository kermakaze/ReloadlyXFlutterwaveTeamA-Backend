const axios = require('axios');

require('dotenv').config();


module.exports = {
    randomAlphaString(len) {
        let charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';
        for (let i = 0; i < len; i++) {
            let randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString.toUpperCase();
    },


    async getFlutterwavePaymentLink(referenceNumber, phoneNumber,  amountUSD, fullname, email) {
        const data = {

            "tx_ref": referenceNumber,
            "amount": amountUSD,

            "redirect_url": `${process.env.BASE_URL}/webhook/transaction_status`,


            "currency": "USD",
            "customer":{
                "email": email,
                "phonenumber":phoneNumber,
                "name":fullname
            },
            "customizations":{
                "title":"Redeemfund Payment",
                "description":"Redeem",
                "logo":"https://redeemfund-emalindahk.vercel.app/_next/image?url=%2Flogo.png&w=3840&q=75"
            }

        };

        try {
            const res =
                await axios.post(process.env.FLUTTERWAVE_API_URL, data, {
                    headers: {
                        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
                    }
                });
             console.log(res.data);

            return res.data.data.link;

        } catch (err) {
            console.error("Payment link generation failed");
            console.error(err.response);
            return false;
        }

    },



};


/*
module.exports.getFlutterwavePaymentLink("dkddmkdffd","0552587984", 50,"Elvis Solomon","ukojielvis@gmail.com")
.then(link=> console.log(link))
.catch(err=> console.error(err));*/
