const { logout } = require("../../services/auth-service");

// @desc Logout user
// @route POST /api/v1/auth/logout
exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        await logout(token);

        res.status(200).json({ success: true, message: 'Logout successfully' });
    } catch (error) {
        next(error);
    }
}