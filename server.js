/* eslint-disable */
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const Models = require('./db');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(express.static(__dirname));


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://vinnieking06.auth0.com/.well-known/jwks.json`
  }),

  audience: 'https://vinnieking06.auth0.com/api/v2/',
  issuer: `https://vinnieking06.auth0.com/`,
  algorithms: ['RS256']
});

app.get('/:user/init', checkJwt, (req, res) => {
  Models.User.find({ where: {id: req.params.user }})
    .then((user) => {
      if (user) {
        getNotes(req, res)
          .then((notes) => {
            res.json(notes)
          })
          .catch(() => {
            res.send('Error getting notes!')
          })
      } else {
          createUser(req.params.id)
            .then((user) => {
              res.json('New User created')
            })
      }
    })
    .catch(() => {
      res.send('Error finding user')
    })
})

app.post('/user/:id', checkJwt, (req, res) => {
  createUser(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(() => {
      res.send('Error creating Account')
    })
})

app.post('/:user/notes', checkJwt, (req, res) => {
  Models.Note.create({ userId: req.params.user, data: req.body.data, title: req.body.title }).then((note) => {
    res.json(note);
  });
});

app.get('/:user/notes/', checkJwt, (req, res) => {
    getNotes(req, res).then((notes) => {
      res.json(notes);
    })
}) 

app.get('/:user/notes/:id', checkJwt, (req, res) => {
  Models.Note.findOne({where: {id: req.params.id, userId: req.params.user}})
    .then((note) => {
      res.json(note);
    })
    .catch(() => {
      res.send('Error with this request')
    })
});

app.put('/:user/notes/:id', checkJwt, (req, res) => {
  Note.update({ data: req.body.data, title: req.body.title }, { where: { id: req.params.id, userId: req.params.user } })
  .then(() => {
    Note.findById(req.params.id)
    .then((note) => {
      res.json(note);
    });
  });
});

app.delete('/:user/notes/:id', checkJwt, (req, res) => {
  Note.destroy({ where: { id: req.params.id, userId: req.params.user } })
  .then((note) => {
    res.end(note);
  });
});

app.get('*', checkJwt, function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

function createUser(id) {
  return Models.User.create({id: id})
}

function getNotes(req,res) {
  const query = { order: [['updatedAt', 'DESC']], where: { userId: req.params.user, id: { $gte: 1 } } };
  if (req.params.limit) {
    query.limit = req.params.limit;
  }

  if (req.params.order) {
    query.order = [['updatedAt', req.params.order]];
  }

  if (req.params.start) {
    query.where = { id: { $gte: req.params.start } };
  }
  return Models.Note.findAll(query)

}

app.listen(process.env.PORT || 5000)
