var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('./build'));
app.use('/', express.static('articles.json'));
app.use('/node_modules', express.static('./node_modules'));
app.use('/blog_editor/', express.static('./build'));
app.use('/blog_editor/:id', express.static('./build'));

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

var addTagAndTime = function (formData) {

    var dateOfArticle = `${new Date().toLocaleString("en-US", {minute: 'numeric',hour: 'numeric',hour12: false})} ${new Date().toLocaleString("en-US", {year: 'numeric',month: 'short',day: 'numeric'})}`;
    var stringTagsBuffer;

    stringTagsBuffer = formData.tags;
    formData.tags = stringTagsBuffer.trim().split(",");
    formData.time = dateOfArticle;
};


app.delete('/articles_data/:id', function(req, res) {

    var datId = req.params.id;

    function deleteArticle(deleteArt, callback) {
       console.log(deleteArt);

       var jsonToDeleteArticle = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));
       var objData = {};

        jsonToDeleteArticle.forEach(function(item, i) {
               if (jsonToDeleteArticle[i].id === deleteArt) {
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



app.put('/articles_data/:id', function (req, res) {

    var articleId = req.params.id;
    var article = req.body;


    function saveEditedArticle(editedArt, callback) {
        var jsonToUptade = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));
        var objData = {};

        addTagAndTime(editedArt);

        jsonToUptade.forEach(function(item) {
            var itemId = item.id, editedItem = articleId;
            if(itemId == editedItem){
                item.author = editedArt.author;
                item.header = editedArt.header;
                item.text = editedArt.text;
                item.tags = editedArt.tags;
                item.image = editedArt.image;
                item.time = editedArt.time;
            }
        });

        objData.editedArticle = article.updated;
        res.send(objData);
        fs.writeFile('./articles.json', JSON.stringify(jsonToUptade, null, 4), callback);
    }

    saveEditedArticle(article.data, function(err) {
        if (err) {
            res.status(404).send('Data not saved');
            return;
        }
    });
});

app.post('/articles_data', function(req, res) {

    var article = req.body;

    function createArticle(data, callback) {
        var objData = {};
        var ids = [], largestDigitID;

        addTagAndTime(data);

        var jsonToCreateArticle = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

        jsonToCreateArticle.forEach(function(item) {
          ids.push(item.id)});

          if (ids.length === 0) {
            ids[0] = 0;
          }

          largestDigitID = Math.max.apply(Math, ids);

          data.id = "" + (largestDigitID + 1);
          jsonToCreateArticle.push(data);
          objData.respDataCreate = data;
          res.send(objData);
          fs.writeFile('./articles.json', JSON.stringify(jsonToCreateArticle, null, 4), callback);

    }

    createArticle(article.data, function (error) {
        if (error) {
            res.status(404).send('Data not created');
            return;
        }
    })

});



app.get('/articles_data/:id', function(req, res) {
      var idToEdit = req.params.id;
      console.log(req.params.id);
      var jsonToUptade = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

         jsonToUptade.forEach( function (item) {
             if (item.id === idToEdit) {
                 res.send(item);
             }
         });
});

app.get('/articles', function(req, res) {
    var articles = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));
    res.send(JSON.stringify(articles));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
