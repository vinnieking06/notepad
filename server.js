const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const Note = require('./db');

app.post('/notes', (req, res) => {
    Note.create({data: req.body.data}).then((note)=>{res.json(note)})
})

app.get('/notes', (req, res) => {
    const query = {order:[['updatedAt', 'DESC']], where: {id: {$gte: 1}}};
    if (req.params.limit) {
        query.limit = req.params.limit
    };
    if (req.params.order) {
        query. order = [['updatedAt', req.params.order]]
    };
    if (req.params.start) {
        query.where = {id: {$gte: req.params.start}}
    }
    Note.findAll(query).then((notes)=>{res.json(notes)})
})

app.listen(3000, function(){
    console.log("server running on port 3000")
})