const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const Note = require('./db');

app.post('/note', (req, res) => {
    Note.create({data: req.body.data}).then((note)=>{res.json(note)})
})

app.get('/note', (req, res) => {
    Note.findAll().then((notes)=>{res.send(notes)})
})

app.listen(3000, function(){
    console.log("server running on port 3000")
})