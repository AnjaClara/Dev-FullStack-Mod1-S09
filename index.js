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

  const newPlace = await Place.findAll();
  response.status(201).json(newPlace); 
  
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
  const place = {
    name: request.body.name,
    telefone: request.body.telefone,
    opening_hours: request.body.opening_hours,
    description: request.body.description,
    latitude: request.body.latitude,
    longitude: request.body.longitude
  }
  const newplace = await Place.create(place);
  response.status(201).json(newplace); 
});


app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});