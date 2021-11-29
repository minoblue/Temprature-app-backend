const Joi = require('joi');
const { password } = require('./custom-validation');

const user = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    reset_token: Joi.string().allow(null, ''),
    reset_token_expire: Joi.date().allow(null, ''),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};

const register = {
    body: Joi.object().keys(user),
};

module.exports = {
    login,
    register
}
