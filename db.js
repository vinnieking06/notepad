const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://vincentking:ilovetesting@localhost:5432/notepad');
// const sequelize = new Sequelize('postgres://fkdyrlsr:JzhorQXQH_LpYcX30-1LWHvZvPFuqvRX@elmer.db.elephantsql.com:5432/fkdyrlsr')

sequelize
  .authenticate()
  .then(() => {
    console.log('database has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

const Note = sequelize.define('note', {
  data: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
});
// Note.sync({force: true}).then(function () {
//   console.log("Created Notes Table")
// });
module.exports = Note;
