const express = require("express");

const {authGuard} = require('../middleware/authentication-guard');

//controller
const {weatherController} = require("../controller/weatherController/getWeatherDataController.js");

const weatherRouter = express.Router();

/**
 * Get weather data
 * @route GET /api/v1/weather
 * @group Weather - Weather functions
 * @returns {object} 200 - weather data
 * @returns {Error}  400 - Unexpected error
 * @returns {Error}  500 - Server error
 */
 weatherRouter.route('/').get(authGuard,weatherController);
 

 module.exports = weatherRouter;