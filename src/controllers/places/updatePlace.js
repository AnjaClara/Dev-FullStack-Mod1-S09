const Place = require('../../models/place')

async function updatedPlace(request, response){
  const id = request.params.id;

  try {
    const place = await Place.findByPk(id);

    if (!place) {
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
};

module.exports = updatedPlace;