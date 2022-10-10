const Joi = require('joi')

//permet de valider les attributs de l'objet JSON
const post = Joi.object({
    //nombre allant de 0 à 120
    time: Joi.number().min(0).max(120),
    //nom allant de 1 à 50 caractères
    name: Joi.string().min(1).max(50)
})

module.exports = {
    post
}