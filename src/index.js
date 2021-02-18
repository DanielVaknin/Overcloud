const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const users = require('./api/users');
const auth = require('./api/auth');
const express = require('express');
const app = express();

mongoose.connect('mongodb+srv://admin:HMQrrUjrqpnYNJ4R@cluster0.0d9xj.mongodb.net/' +
    'test?authSource=admin&replicaSet=atlas-5cxd80-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));