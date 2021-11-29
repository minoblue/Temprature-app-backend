const express = require('express');
const logger = require('morgan');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const connectDB = require("./app/resources/mongodb-connection");
const { connectRedis } = require("./app/resources/redis-servis");
const errorHandler = require("./app/middleware/error-handler");

// Get env configurations
dotenv.config({ path: `./app/config/${process.env.NODE_ENV}.env` });

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV;
const HOST = process.env.HOST;

// Connect to the Database
connectDB();

// Connect to the Redis server
connectRedis();

const authRoute = require("./app/routes/auth-route");
const weatherRoute = require("./app/routes/weather-route.js");


const app = express();
const expressSwagger = require('express-swagger-generator')(app);
app.use(cors());

/**
 * Swagger options
 */
 let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a swagger project for node server',
          title: 'Swagger',
          version: '1.0.0',
      },
      host: `${HOST}/${PORT}`,
      basePath: '/',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "JWT authentication and authorization",
          }
      }
  },
  basedir: __dirname, //app absolute path
  files: ['./app/routes/*.js'] //Path to the API handle folder
};
expressSwagger(options);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

app.use(logger('dev'));

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/weather', weatherRoute);

// Handle Errors
app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Node app running on port ${PORT}`);
});