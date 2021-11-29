const userService = require("./user-service");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require('jsonwebtoken');
const { removeFromRedis } = require("../resources/redis-servis");

const login = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
        throw new ErrorResponse( 'Incorrect email or password', 400 );
    }
    return user;
};

const logout = async (token) => {
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
    await removeFromRedis(decodedToken.email);
};


module.exports = {
    login,
    logout
};
