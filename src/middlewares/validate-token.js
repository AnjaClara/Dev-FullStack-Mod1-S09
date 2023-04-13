const jwt = require('jsonwebtoken')
const User = require('../models/user')

function validateToken(request, response, next){

  console.log(request.headers.authorization);
  const token = request.headers.authorization;

  if(!token || token === 'Bearer'){
    return response.status(403).json({message: 'Token não presente'})
  }

  const tokenJwt = token.slice(7); 

  jwt.verify(tokenJwt, 'SECRET_KEY', (error, decoded)=>{
    if(error){
      
      if(error.name === "TokenExpiredError"){
        return response.status(403).json({message: 'Token Expirado'});
      }else if(error.name === "JsonWebTokenError"){
        return response.status(403).json({message: 'Token Inválido'});
      }

    }else{
      request.body.userId = decoded;
      return next();
    }
  });

}

module.exports = validateToken