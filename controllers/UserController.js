const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');


module.exports = {

    async getProfile(req, res) {
        let beneficiary = await Beneficiary.findById(req.params['id'], 'id name email');
        res.send(beneficiary);
    },


}