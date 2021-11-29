const { setToRedis } = require("../resources/redis-servis");

const tokenService = async (user) => {

    const token = user.generateToken(user.email);

    // set token to redis cache
    setToRedis(token, user.email);

    return token;
}

module.exports = {
    tokenService
}