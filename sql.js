const fs = require('fs');

senha = fs.readFile('senhas.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
   return data ;
  });

const Sequelize = require('sequelize')
const sequelize = new Sequelize('CARONAPP','root',senha,{
  host: 'localhost',
  dialect:'mysql'

})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}) 