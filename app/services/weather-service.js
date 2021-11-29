const axios = require('axios');
const WeatherModel = require('../../app/model/weather-model');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const openWeatherURL = 'http://api.openweathermap.org/data/2.5/group';

const getCurrentWeatherData = async(cities) => {
    try {
        const cityIds = cities.reduce((ids,city)=>`${ids},${city.cityId}`,'');
        const params = {
            id: cityIds,
            exclude: "hourly,daily,minutely",
            units: "metric",
            appid: WEATHER_API_KEY,
        };

        const { data : {list} } = await axios.get(openWeatherURL, { params });
        return list;
    } catch (err) {
        console.error(err);
    }
};

const saveCountryWeather = async (data) => {
    let countryWeather = await WeatherModel.insertMany(data);
    return countryWeather;
}

const getWeatherDataByUserId = async (userId) => {
    let weatherDataByUser = await WeatherModel.find({user: userId});

    return weatherDataByUser;
};

module.exports = {
    getCurrentWeatherData,
    saveCountryWeather,
    getWeatherDataByUserId,
};