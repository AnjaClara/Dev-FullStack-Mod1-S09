const Place = require('../../models/place')

async function createPlace(request, response){
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
}

module.exports = createPlace;