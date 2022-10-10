var express = require('express');
var router = express.Router();
const isValid = require('../middlewares/isValid')
const schema = require('../validators/time')
const Time = require('../models/Time')


//renvoie les 10 meilleurs temps ainsi que leur pseudo
router.get('/', function(req, res){
    Time.find()
        .sort({'time': 1})//-1 : descendent, 1: ascendent
        .limit(10)
        .then(data=> res.json(data))
        .catch(error=> res.status(401).json({error}))
})

//insère un nouveau temps
router.post('/', isValid(schema.post, 'body'), function(req, res){
    Time(req.body)
	    .save()
        .then(data=> res.end())
        .catch(error=> res.status(401).json({error}))
})


module.exports = router