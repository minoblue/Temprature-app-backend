 const { getCurrentWeatherData, getWeatherDataByUserId, saveCountryWeather } = require("../../services/weather-service.js");
 const cities = require("../../config/cities");

// @desc Get Weather Data
// @route Get /api/v1/weather
exports.weatherController = async (req, res, next) => {
    try {
        // get weather data from OpenWeatherMap API
        const weatherData = await getCurrentWeatherData(cities);

        let recods = weatherData.map(city=> {
            return {
                country: city.name,
                temprature: city.main.temp,
                user: req.user.id,
            }
        });

        await saveCountryWeather(recods);

        let dataByUser = await getWeatherDataByUserId(req.user.id);

        let weatherBycountry = cities.reduce((acc,city)=>Object.assign(acc, {[city.city]: []}),{} );
        console.log('weatherBycountry', weatherBycountry);

        weatherBycountry = dataByUser.reduce((obj,record) => {
            obj[record.country].push(record);
            return obj;

        } , weatherBycountry);

        res.status(200).json({ success: true, data: weatherBycountry});
    } catch (error) {
        next(error);
    }
}