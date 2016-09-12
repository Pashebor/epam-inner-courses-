var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var history = require('connect-history-api-fallback');



var app = express();
var path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(history());

/*var articles = [
    {
        "id": "1",
        "author": "E. Hyperraccoon",
        "image": "app/assets/img/flowers.png",
        "header": "Blogotitle of blogopost about blogoflowers",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "22:58 Jan 01, 2014",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Developer", "Anna", "Beer", "Banana"]
    },
    {
        "id": "2",
        "author": "E. Hyperraccoon",
        "image": "app/assets/img/paint.png",
        "header": "Blogotitle of paints",
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "time": "28:67 Jan 01, 2014",
        "tags": ["Racoon", "Racoon", "Coon", "Dog", "Cat", "Duck", "Developer", "Car", "Jeep"]
    }
];*/


function saveEditedArticle(editedArt, callback) {
    var jsonToUptade = JSON.parse(fs.readFileSync('./app/assets/js/articles.json', 'utf8'));

    jsonToUptade.forEach(function(item) {
        var itemId = item.id, editedItem = editedArt.id;
        if(itemId == editedItem){
            item.author = editedArt.author;
            item.header = editedArt.header;
            item.text = editedArt.text;
            item.tags = editedArt.tags;
            item.image = editedArt.image;
            item.time = editedArt.time;
        }
    });

    fs.writeFile('./app/assets/js/articles.json', JSON.stringify(jsonToUptade, null, 4), callback);
}

function deleteArticle(deleteArt, callback) {
    var i;
    var jsonToDeleteArticle = JSON.parse(fs.readFileSync('./app/assets/js/articles.json', 'utf8'));

        for (i = 0; i < jsonToDeleteArticle.length; i += 1) {
            if (jsonToDeleteArticle[i].id === deleteArt.id) {
                var index = jsonToDeleteArticle.indexOf(jsonToDeleteArticle[i]);
                jsonToDeleteArticle.splice(index, 1);
            }
        }

    fs.writeFile('./app/assets/js/articles.json', JSON.stringify(jsonToDeleteArticle, null, 4), callback);
}

function createArticle(createdData, callback) {
    var jsonToCreateArticle = JSON.parse(fs.readFileSync('./app/assets/js/articles.json', 'utf8'));
    jsonToCreateArticle.push(createdData);
    fs.writeFile('./app/assets/js/articles.json', JSON.stringify(jsonToCreateArticle, null, 4), callback);
}

app.use('/', express.static('./app'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/public', express.static('./public'));

app.get('/edit_article/:id', function (req, res) {
  console.log(req.params.id);
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.get('/create_article', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.post('/delete_article', function(req, res) {

    res.json(req.body);

    deleteArticle(req.body, function(error) {
       if (error) {
           res.status(404).send('The record did not deleted');
           return;
       }
    });

});

app.post('/edit_articles', function (req, res) {

    res.json(req.body);

    saveEditedArticle(req.body, function(err) {
        if (err) {
            res.status(404).send('Data not saved');
            return;
        }
    });
});

app.post('/create_article', function(req, res) {

    res.json(req.body);

    createArticle(req.body, function (error) {
        if (error) {
            res.status(404).send('Data not created');
            return;
        }
    })

});

app.get('/tags', function(req, res) {
    var articles = JSON.parse(fs.readFileSync('./app/assets/js/articles.json', 'utf8'));

    var allTags = [];

    articles.forEach(function (item) {
        var tags = item.tags;
        tags.forEach(function (tag){
            if (allTags.indexOf(tag.trim()) === -1) {
                allTags.push(tag);
            }
        });
    });

    res.send(allTags);
});



app.get('/articles', function(req, res) {
    var json = JSON.parse(fs.readFileSync('./app/assets/js/articles.json', 'utf8'));

    var arr = Object.keys(json).map(
        function(key) {
            return json[key]
        });

    res.send(arr);
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
