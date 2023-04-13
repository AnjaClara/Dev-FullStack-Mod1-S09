const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user')

async function createSessions(request, response){

  try {
    const userInDatabase = await User.findOne({
      where: {
        username: request.body.username,
      }
    })
    
    if(!userInDatabase){
      return response.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
  
    const passwordIsValid = await bcrypt.compare(request.body.password, userInDatabase.password)
  
    if(!passwordIsValid){
      return response.status(401).json( {message: 'Credenciais Incorretas'});
    }
    
    const token = jwt.sign(
      {
        id: userInDatabase.id
      },
      'SECRET_KEY',
      {
        expiresIn: '1h'
      }
    )
  
    response.json( {name: userInDatabase.name, token: token})
  
  } catch (error) {
    response.status(500).json({message: 'Não conseguimos processar sua aplicação'});
  }

};

module.exports = createSessions;