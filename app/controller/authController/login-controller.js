const ErrorRenspose = require("../../utils/errorResponse");
const { login } = require("../../services/auth-service");
const { tokenService } = require("../../services/token-service");
const moment = require('moment');

// @desc Login user
// @route POST /api/v1/user/login
exports.loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if (!email) {
            return next(new ErrorRenspose('Please enter the username', 400));
        }
        if (!password) {
            return next(new ErrorRenspose('Please enter the password', 400));
        }

        const user = await login(email, password);

        const token = await tokenService(user);
        
        let resObj = user.toObject();
        delete resObj.password;

        const options = { expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), httpOnly: true };
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }
        res.status(200).cookie('token', token, options).json({ success: true, token, user: resObj });

    } catch (error) {
        next(error);
    }
}
