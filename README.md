# Country Weather API


# Routes

    http://localhost:3006/api/v1/auth/register

    http://localhost:3006/api/v1/auth/login

    http://localhost:3006/api/v1/auth/logout

    http://localhost:3006/api/v1/weather


# Technologies 

    Express - Web Application Framwork
    MongoDB - Main DB
    Redis - In memory key/value store
    Mongoose - MongoDB object modeling
    JWT token based Authentication

# Config

    Config file - /app/config/development.env

    Before running Edit the config data according to environment
        HOST=localhost
        PORT=3006

        MONGO_PORT=27017
        DATABASE=country_temperatur

        Redis
        REDIS_URL=127.0.0.1
        REDIS_PORT=6379

# Running 

    npm install
    npm run dev
