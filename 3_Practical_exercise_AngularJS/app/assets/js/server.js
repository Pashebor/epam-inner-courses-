var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var articles = [
    {
        id: 1,
        author: "E. Hyperraccoon",
        image: "app/assets/img/flowers.png",
        header: "Blogotitle of blogopost about blogoflowers",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: "22:58 Jan 01, 2014",
        tags: ['Racoon', 'Racoon', 'Coon', 'Dog', 'Cat', 'Developer', 'Anna', 'Beer', 'Banana']
    },
    {
        id: 2,
        author: "E. Hyperraccoon",
        image: "app/assets/img/paint.png",
        header: "Blogotitle of paints",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time: "28:67 Jan 01, 2014",
        tags: ['Racoon', 'Racoon', 'Coon', 'Dog', 'Cat', 'Duck', 'Developer', 'Car', 'Jeep']
    }
];


function savePersonToPublicFolder(person, callback) {
    fs.writeFile('./some.json', JSON.stringify(person), callback);
}

app.use('/', express.static('./../../../'));

app.post('/articles', function (req, res) {

    console.log(req.body);

    res.json(req.body);

    savePersonToPublicFolder(req.body, function(err) {
        if (err) {
            res.status(404).send('User not saved');
            return;
        }
    });
});

app.get('/tags', function(req, res) {
    var allTags = [];

    articles.forEach(function (item) {
        var tags = item.tags;
        tags.forEach(function (tag){
            if (allTags.indexOf(tag) === -1) {
                allTags.push(tag);
            }
        });
    });

    res.send(allTags);
});



app.get('/articles', function(req, res) {
    var json = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

    var arr = Object.keys(json).map(
        function(key) {
            return json[key]
        });

    res.send(JSON.stringify(arr));
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});