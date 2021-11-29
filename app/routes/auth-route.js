const express = require("express");

// authGuard
const { authGuard } = require("../middleware/authentication-guard");

//validation
const validate = require('../middleware/validate');
const authValidation = require('../validation/auth-validation');

// auth routes controllers
const {registerUser} = require("../controller/authController/register-controller");
const {loginUser} = require("../controller/authController/login-controller");
const {logoutUser} = require("../controller/authController/logout-controller");

const authRouter = express.Router();

// Swagger auth model
/**
 * @typedef Auth
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 */

// Swagger user model
/**
 * @typedef User
 * @property {string} name.required - User name
 * @property {string} email.required - User email
 * @property {string} password.required - User password
 * @property {string} reset_token - default: null - Generated token for the user
 * @property {date} reset_token_expire - default: null - Generated token expire date for the user
 */

// auth route paths

/**
 * Add an user
 * @route POST /api/v1/auth/register
 * @group Auth - Auth functions
 * @param {User.model} user.body.required
 * @returns {object} 200 - User token
 * @returns {Error}  400 - Unexpected error
 * @returns {Error}  500 - Server error
 */
authRouter.route('/register').post(validate(authValidation.register),registerUser);

/**
 * Login an user
 * @route POST /api/v1/auth/login
 * @group Auth - Auth functions
 * @param {Auth.model} auth.body.required
 * @returns {object} 200 - User token
 * @returns {Error}  400 - Unexpected error
 * @returns {Error}  500 - Server error
 */
authRouter.route('/login').post(validate(authValidation.login),loginUser);


/**
* Logout the user
* @route POST /api/v1/auth/logout
* @group Auth - Auth functions
* @param {string} auth.header.required - Bearer token
* @returns {object} 200 - Message of 'Logout successfully'
* @returns {Error}  400 - Unexpected error
* @returns {Error}  500 - Server error
*/
authRouter.route('/logout').post(authGuard, logoutUser);

module.exports = authRouter
