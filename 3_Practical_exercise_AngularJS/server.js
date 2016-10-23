'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const serverController = require('./server.controller');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./build'));
app.use('/', express.static('articles.json'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/create', express.static('./build'));



var articles = [
    {
        "id": "1",
        "author": "E. Hyperraccoon",
        "image": "images/flowers.png",
        "header": "Blogotitle of blogopost about blogoflowers",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "22:58 Jan 01, 2014",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
    },
    {
        "id": "2",
        "author": "E. Hyperraccoon",
        "image": "images/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "28:67 Jan 01, 2014",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Duck", "Developer", "Car", "Jeep"]
    },
    {
        "id": "3",
        "author": "P. Demyanov",
        "image": "images/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "28:67 Jan 01, 2014",
        "tags": ["tag1", "tag2", "tag1", "tag3"]
    }
];

app.route('/articles_data/:id')
.delete((req, res) => {
    serverController.deleteArticle(req.params.id, articles);
    res.send(req.params.id);
})
.put((req, res) => {
    serverController.editArticle(req.body, req.params.id, articles);
    res.send(req.body);
})
.get((req, res) => {
   let article = serverController.getSingleArticle(req.params.id, articles);
   res.send(article);
});

app.route('/articles_data')
.post((req, res) => {
    serverController.createArticle(req.body, articles);
    res.send(req.body);
})
.get((req, res) => {
    res.send(articles);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
