const bcrypt = require('bcrypt');
const User = require('../../models/user');

async function createUser(request, response){
  try {    
    const userInDatabase = await User.findOne({
      where: {
        username: request.body.username
      }
    }); 

    if (!request.body.name || !request.body.email || !request.body.username || !request.body.password){
      return response.status(400).json( {message: 'Todos os campos são obrigatórios'});
    }else if (userInDatabase){
      return response.status(403).json( {message: "Usuário já existente"});
    }

    const hash = await bcrypt.hash(request.body.password, 10);

    const newUser = {
      name: request.body.name,
      email: request.body.email,
      username: request.body.username,
      password: hash
    };

    const user = await User.create(newUser);
    
    response.status(201).json(user);

  } catch (err) {
    console.error("Erro aqui", err);
    return response.status(400).json({ message: 'Erro ao criar usuário' });
  }
};

module.exports = createUser;