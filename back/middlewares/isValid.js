/*
    Middleware qui permet de valider & filter les paramètres envoyés
*/

module.exports = (schema, provider)=>{
    return function(req, res, next){
        const {error, value} = schema.validate( req[provider] )
        
        if(error) return res.status(401).json({error})

        req[provider] = value
        next()
    }
}