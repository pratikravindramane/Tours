const jwt = require('jsonwebtoken')
const genrateToken = (id)=>{
    return jwt.sign({id},process.env.JWT,{expiresIn:'1d'})
}
module.exports = genrateToken