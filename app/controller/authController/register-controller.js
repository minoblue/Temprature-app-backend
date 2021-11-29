const { createUser } = require("../../services/user-service");
const { tokenService } = require("../../services/token-service.js");

// @desc Create new user
// @route POST /api/v1/auth/register
exports.registerUser = async (req, res, next) => {
    try {

        const user = await createUser(req.body);

        const token = await tokenService(user);

        const options = { expiresIn: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), httpOnly: true };
        if (process.env.NODE_ENV === 'production') {
            options.secure = true;
        }
        res.status(200).cookie('token', token, options).json({ success: true, token, user: user });
    } catch (error) {
        next(error);
    }
}