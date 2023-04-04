const express = require('express');
const connection = require('./src/database');
const Place = require('./src/models/place');
const app = express();

app.use(express.json())
// //EX1-3
// const places = [];

connection.authenticate();
connection.sync();
console.log("Connection has been established successfully");

app.get('/', (request, response) => {
  console.log("Funcionando");
  response.json({mensagem: "Olá!"})
})

//EX4
app.get('/places', async(request, response)=>{

  try{
    const newPlace = await Place.findAll();
    response.status(201).json(newPlace);
  }catch(error){
    response.status(500).json({message: 'Erro '})
  }
   
  
});

// //EX1-3
// app.post('/places', (request, response)=>{
//   console.log(places)
//   const place = {
//     name: request.body.name,
//     telefone: request.body.telefone,
//     opening_hours: request.body.opening_hours,
//     description: request.body.description,
//     latitude: request.body.latitude,
//     longitude: request.body.longitude
//   }
//   places.push(place);
//   response.status(201).json(place); 
// });

//EX4
app.post('/places', async(request, response)=>{
  try{
    const place = {
      name: request.body.name,
      telefone: request.body.telefone,
      opening_hours: request.body.opening_hours,
      description: request.body.description,
      latitude: request.body.latitude,
      longitude: request.body.longitude
    }
    if(!place.name){
      return response.status.jason({message: 'Nome não pode ser ser vazio'});
    }

    const placeInDatabase = await Place.findOne({where: {name: place.name}});
    
    if(placeInDatabase !== null){
      return response
      .status(400)
      .json({message: 'Já existe esse nome'})  
    }

    const newplace = await Place.create(place);
    response.status(201).json(newplace); 
    
  }catch(error){
    response.status(500).json({message: 'Não conseguimos processar sua aplicação'});

  }
});

app.put('/places/:id', async (request, response) => {
  const id = request.params.id;

  try {
    const place = await Place.findByPk(id);

    if (place === null) {
      return response.status(404).json({ message: 'Local não encontrado' });
    }

    const updatedPlace = {
      name: request.body.name || place.name,
      telefone: request.body.telefone || place.telefone,
      opening_hours: request.body.opening_hours || place.opening_hours,
      description: request.body.description || place.description,
      latitude: request.body.latitude || place.latitude,
      longitude: request.body.longitude || place.longitude,
    };

    await Place.update(updatedPlace, { where: { id: id } });

    response.status(200).json({ message: 'Local atualizado com sucesso' });

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Não foi possível atualizar o local' });
  }
});

app.delete('/places/:id', async(request, response)=>{
  console.log(request.params);

  await Place.destroy({
    where: {
      id: request.params.id
    }
  })
  response.status(200).json({message:'deletado com sucesso'})
})

app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});