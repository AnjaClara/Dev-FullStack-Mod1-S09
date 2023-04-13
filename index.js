const { request } = require('express');
const express = require('express');

const connection = require('./src/database');

const validateToken = require('./src/middlewares/validate-token');

const findPlaces = require('./src/controllers/places/findPlaces');
const createPlace = require('./src/controllers/places/createPlace');
const updatedPlace = require('./src/controllers/places/updatePlace');
const deletePLace = require('./src/controllers/places/deletePlace');
const createUser = require('./src/controllers/users/createUser');
const createSessions = require('./src/controllers/sessions/createSessions');

const app = express();

app.use(express.json())
// //EX1-3S09
// const places = [];

connection.authenticate();
connection.sync();
console.log("Connection has been established successfully");

app.get('/', (request, response) => {
  console.log("Funcionando");
  response.json({mensagem: "Olá!"})
})

//EX4S09
app.get('/places', validateToken, findPlaces)

// //EX1-3 S09
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

//EX4S09
app.post('/places', validateToken, createPlace)

//EX6S09
app.put('/places/:id', validateToken, updatedPlace)

//EX5S09
app.delete('/places/:id', validateToken, deletePLace)

//EX1e2S10
app.post('/users', validateToken, createUser)

//EX3S10
app.post('/sessions', createSessions)

app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});