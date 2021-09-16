var express = require('express');
var router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ResponseUtils = require('../util/ResponseUtils');


module.exports = {
    checkAuth(req, res, next) {


        if (!req.headers.authorization) {
            return ResponseUtils.sendError(res, 403, "Authorization headers not set");
        }


        let token = req.headers.authorization.replace("Bearer", "").trim();


        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, process.env.APP_SECRET, function (err, decoded) {
                if (err) {
                    return ResponseUtils.sendError(res, 403, "Authentication Failed")
                } else {
                    req.decoded = decoded;
                    next();

                }
            });
        }


    }
};
