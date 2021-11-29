const jwt = require('jsonwebtoken');
const ErrorRenspose = require("../utils/errorResponse");
const UserModel = require('../model/user-model');
const { getFromRedis } = require("../resources/redis-servis");

// Route guard
exports.authGuard = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorRenspose('Authorization not granted', 401));
    }

    try {
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await UserModel.findOne({email: decodedToken.email});
        const result = await getFromRedis(token, decodedToken.email);

        if (!result) {
            return next(new ErrorRenspose('Token is invalid', 401));
        }

        if (decodedToken.exp < Date.now()/1000) {
            return next(new ErrorRenspose('Token is expired', 401));
        }

        next();
    } catch (error) {
        return next(new ErrorRenspose('Authorization not granted', 401));
    }
}
