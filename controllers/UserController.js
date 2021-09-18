const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');


module.exports = {

    async getProfile(req, res) {
        let beneficiary = await Beneficiary.findById(req.params['id'], 'id firstName lastName email');
        res.send(beneficiary);
    },


}