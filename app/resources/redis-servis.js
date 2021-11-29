let Redis = require('ioredis');

let redisClient;

exports.connectRedis = () => {
    let redis_url = process.env.REDIS_URL;
    let redis_password = process.env.REDIS_PASS;
    let redis_port = process.env.REDIS_PORT;
    try {
        let client;

        switch(process.env.NODE_ENV) {
            case "development":
                client = new Redis({
                    host: redis_url,
                    port: redis_port,
                    password: redis_password
                });
                break;
        }

        client.on('error', error => {
            client.quit();
            throw new Error(`\nUnable connect to the Redis!\n${error}`);
        });
        client.on('ready', () => {
            console.log('Redis connection success');
            redisClient = client;
        });
    } catch (error) {
        throw new Error(`\nUnable connect to the Redis!\n${error}`);
    }
}

exports.setToRedis = (token, email) => {
    this.connectRedis();
    try {
        if (redisClient) {
            const key = 'user_' + email;

            redisClient.set(key, token, (err, reply) => {
                if (err) throw err;
                console.log(key, reply);
            });
        }
    } catch (error) {
        throw new Error(error);
    }
}

exports.getFromRedis = async (token, email) => {
    this.connectRedis();
    let userToken = null;
    try {
        if (redisClient) {
            const key = 'user_' + email;

            await redisClient.get(key, (err, reply) => {
                if (err) throw err;
                if (reply == token) {
                    userToken = reply;
                }
            });
        }
        return userToken;
    } catch (error) {
        throw new Error(error);
    }
}

exports.removeFromRedis = async (email) => {
    this.connectRedis();
    try {
        if (redisClient) {
            const key = 'user_' + email;

            redisClient.del(key, (err, reply) => {
                if (err) throw err;
            });
        }
    } catch (error) {
        throw new Error(error);
    }
}
