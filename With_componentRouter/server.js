var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./build'));
app.use('/', express.static('articles.json'));
app.use('/create', express.static('./build'));
app.use('/edit/:id', express.static('./build'));
app.use('/node_modules', express.static('./node_modules'));

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


app.delete('/articles_data/:edited_data', function(req, res) {

    var datId = JSON.parse(req.params.edited_data);

    function deleteArticle(deleteArt, callback) {
       console.log(deleteArt);

       var jsonToDeleteArticle = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));
       var objData = {};

        jsonToDeleteArticle.forEach(function(item, i) {
               if (jsonToDeleteArticle[i].id === deleteArt.id) {
                   var index = jsonToDeleteArticle.indexOf(jsonToDeleteArticle[i]);
                   jsonToDeleteArticle.splice(index, 1);
               }
        });

        objData.respDataDelete = jsonToDeleteArticle;
        res.send(deleteArt);
        fs.writeFile('./articles.json', JSON.stringify(jsonToDeleteArticle, null, 4), callback);
    }

    deleteArticle(datId, function(error) {
        if (error) {
            res.status(404).send('The record did not deleted');
            return;
        }
    });

});

app.get('/articles_data/:edited_data', function (req, res) {
    var idToEdit = JSON.parse(req.params.edited_data);

    var jsonToUptade = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

       jsonToUptade.forEach( function (item) {
           if (item.id === idToEdit) {
               res.send(item);
           }
       })
});

app.put('/articles_data/:edited_data', function (req, res) {

    var editedData = JSON.parse(req.params.edited_data);

    function saveEditedArticle(editedArt, callback) {
        var jsonToUptade = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));
        var objData = {};

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

        objData.respData = jsonToUptade;
        objData.editedArticle = editedData;
        res.send(objData);
        fs.writeFile('./articles.json', JSON.stringify(jsonToUptade, null, 4), callback);
    }

    saveEditedArticle(editedData, function(err) {
        if (err) {
            res.status(404).send('Data not saved');
            return;
        }
    });
});

app.post('/articles_data/:edited_data', function(req, res) {

    var createdData = JSON.parse(req.params.edited_data);

    function createArticle(data, callback) {
        var objData = {};
        var ids = [], largestDigitID;

        var jsonToCreateArticle = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

        jsonToCreateArticle.forEach(function(item) {ids.push(item.id)});
        largestDigitID = Math.max.apply(Math, ids);
        data.id = "" + (largestDigitID + 1);
        jsonToCreateArticle.push(data);

        objData.respDataCreate = data;
        res.send(objData);

        fs.writeFile('./articles.json', JSON.stringify(jsonToCreateArticle, null, 4), callback);

    }

    createArticle(createdData, function (error) {
        if (error) {
            res.status(404).send('Data not created');
            return;
        }
    })

});

app.get('/articles_data', function(req, res) {
    var json = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

    var arr = Object.keys(json).map(
        function(key) {
            return json[key]
        });

    res.send(JSON.stringify(arr));
});


app.get('/tags', function(req, res) {
    var jsonData = JSON.parse(fs.readFileSync('articles.json', 'utf8'));

    var allTags = [];

    jsonData.forEach(function (item) {
        var tags = item.tags;
        tags.forEach(function (tag){
            if (allTags.indexOf(tag.trim()) === -1) {
                allTags.push(tag);
            }
        });
    });

    res.send(allTags);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
