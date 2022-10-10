const {Schema, model} = require('../utils/mongodb')

/*
    Représente la table `Time` dans la base de donnée Mongodb
*/

const Time = model('Time', new Schema({
    time: Number,
    name: String,
}));

module.exports = Time