const ResponseUtils = require('../utils/ResponseUtils');
const Beneficiary = require('../models/Beneficiary');


module.exports = {

    async getProfile(req, res) {
        let beneficiary = await Beneficiary.findById(req.params['id'], '-passwordHash -emailVerified');
        res.send(beneficiary);
    },

    async createProfile(req, res){
        try {
            await Beneficiary.findByIdAndUpdate(req.decoded.id, {
                profilePhotoS3: req.body['profilePhotoS3'],
                countryCode: req.body['countryCode'],
                countryName: req.body['countryName'],
                phoneNumber: req.body['phoneNumber'],

            });

            ResponseUtils.sendGenericResponse(res);

        }
        catch (e) {
            ResponseUtils.sendServerError(res)
        }
    }


}