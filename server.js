/* eslint-disable */

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

app.use(express.static(__dirname));
const Note = require('./db');

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://vinnieking06.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://vinnieking06.auth0.com/api/v2/',
  issuer: `https://vinnieking06.auth0.com/`,
  algorithms: ['RS256']
});

app.post('/private', checkJwt, function(req, res){
  var timesheet = req.body;
  res.status(201).send("hello");
})

app.post('/notes', (req, res) => {
  Note.create({ data: req.body.data, title: req.body.title }).then((note) => {
    res.json(note);
  });
});

app.get('/notes', (req, res) => {
  const query = { order: [['updatedAt', 'DESC']], where: { id: { $gte: 1 } } };

  if (req.params.limit) {
    query.limit = req.params.limit;
  }

  if (req.params.order) {
    query.order = [['updatedAt', req.params.order]];
  }

  if (req.params.start) {
    query.where = { id: { $gte: req.params.start } };
  }

  Note.findAll(query).then((notes) => {
    res.json(notes);
  });
});

app.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  Note.findById(id).then((err, note) => {
    res.json(note);
  });
});

app.put('/notes/:id', (req, res) => {
  Note.update({ data: req.body.data, title: req.body.title }, { where: { id: req.params.id } })
  .then(() => {
    Note.findById(req.params.id)
    .then((note) => {
      res.json(note);
    });
  });
});

app.delete('/notes/:id', (req, res) => {
  Note.destroy({ where: { id: req.params.id } })
  .then((err, note) => {
    res.end(note);
  });
});

app.get('*', function(req, res){
  res.sendfile(__dirname + '/index.html');
})

app.listen(process.env.PORT || 5000)
