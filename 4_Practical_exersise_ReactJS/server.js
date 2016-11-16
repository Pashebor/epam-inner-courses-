'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const serverController = require('./server.controller');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('./build'));
app.use('/', express.static('articles.json'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/blog_editor', express.static('./build'));
app.use('/blog_editor/:id', express.static('./build'));



var articles = [
    {
        "id": "1",
        "author": "E. Hyperraccoon",
        "image": "images/flowers.png",
        "header": "Blogotitle of blogopost about blogoflowers",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "2016-11-07T08:55:16.192Z",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
    },
    {
        "id": "2",
        "author": "E. Hyperraccoon",
        "image": "images/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "2016-11-07T08:55:16.192Z",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Duck", "Developer", "Car", "Jeep"]
    },
    {
        "id": "3",
        "author": "P. Demyanov",
        "image": "images/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "2016-11-07T08:55:16.192Z",
        "tags": ["tag1", "tag2", "tag1", "tag3"]
    }
];

app.delete('/articles_data/:id', function (req, res) {
  let  id = serverController.deleteArticle(req.params.id, articles);
  res.send(id);
});
app.put('/articles_data/:id', function (req, res) {
    let reqData = req.body;
    let editedArticle = serverController.editArticle(JSON.parse(reqData.formData), req.params.id, articles);
    res.send(editedArticle);
});
app.get('/articles_data/:id', function (req, res) {
   let article = serverController.getSingleArticle(req.params.id, articles);
   res.send(article);
});

app.post('/articles_data', function (req, res) {
    let reqData = req.body;
    let createdArticle = serverController.createArticle(JSON.parse(reqData.formData), articles);
    res.send(createdArticle);
});
app.get('/articles_data', function (req, res) {
    res.send(articles);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
