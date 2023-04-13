const Place = require('../../models/place')

async function deletePLace(request, response){
  console.log(request.params);

  await Place.destroy({
    where: {
      id: request.params.id
    }
  })
  response.status(200).json({message:'deletado com sucesso'})
};

module.exports = deletePLace;