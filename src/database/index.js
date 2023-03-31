const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');

const connection = new Sequelize({

  dialect: 'postgres', 
  host: 'localhost', 
  username: 'postgres',
  password: '2207',
  database: 'db_semana9',
  port: '5432',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }

})

module.exports = connection;