const express = require('express');
const connection = require('./src/database');
const app = express();

app.use(express.json())

const places = [];

connection.authenticate()
console.log("Connection has been established successfully");

app.get('/', (request, response) => {
  console.log("Funcionando");
  response.json({mensagem: "Olá!"})
})


app.post('/places', (request, response)=>{
  console.log(places)
  const place = {
    name: request.body.name,
    telefone: request.body.telefone,
    opening_hours: request.body.opening_hours,
    description: request.body.description,
    latitude: request.body.latitude,
    longitude: request.body.longitude
  }
  places.push(place);
  response.status(201).json(place); 
});


app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});