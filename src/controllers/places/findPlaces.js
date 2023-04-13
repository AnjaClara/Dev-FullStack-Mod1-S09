const Place = require('../../models/place')

async function findPlaces(request, response){

  try{
    const newPlace = await Place.findAll();
    response.status(201).json(newPlace);
  }catch(error){
    response.status(500).json({message: 'Erro '})
  }
    
};

module.exports = findPlaces;