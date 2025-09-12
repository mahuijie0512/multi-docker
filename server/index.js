const keys = require('./keys');

//express app setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//postgres client setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost PG Connection'));

// 等待PostgreSQL准备好
const connectWithRetry = () => {
  pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => {
      console.log('PostgreSQL connection failed, retrying in 5 seconds...', err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

//redis client setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
const redisPublisher = redisClient.duplicate();

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));

//express route handlers
app.get('/',(req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    console.log('Route /values/all called');
    res.send([]);
});

app.get('/values/current', async (req, res) => {
    console.log('Route /values/current called');
    res.send({});
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    if (parseInt(index) > 40) {
        return res.status(422).send('Index too high');
    }

    try {
        redisClient.hset('values', index, 'Nothing yet');
        redisPublisher.publish('insert', index);
        await pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);
        res.send({ working: true });
    } catch (err) {
        console.log('Error inserting value:', err);
        res.status(500).send('Database error');
    }
});

app.listen(5000, err =>{
    console.log('Listening');
});
