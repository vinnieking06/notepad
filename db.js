const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://cmylunjh:8hqd45a2YC6vQuMUjevYwHSRZyKgpUy6@stampy.db.elephantsql.com:5432/cmylunjh');

sequelize
  .authenticate()
  .then(() => {
    console.log('database has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

const User = sequelize.define('user', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});

const Note = sequelize.define('note', {
  data: {
    type: Sequelize.STRING,
  },
  title: {
    type: Sequelize.STRING,
  },
});

Note.belongsTo(User);
User.hasMany(Note);

User.sync({ }).then(() => {
  Note.sync({ }).then(() => {
    console.log('Created tables');
  });
});

const Models = {};

Models.User = User;
Models.Note = Note;

module.exports = Models;
