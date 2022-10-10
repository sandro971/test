const mongoose = require('mongoose');
const mongodbUri = require('mongodb-uri');

// on crée une URL à l'air des variables d'environnement
const uri = mongodbUri.format({
    username: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    hosts: [
        {
            host: process.env.MONGO_HOST,
            port: process.env.MONGO_PORT
        }
    ],
    database: process.env.MONGO_INITDB_DATABASE,
    options: {
        authSource: 'admin'
    }
});

// on connect la base de donnée
mongoose.connect(uri);

module.exports = mongoose