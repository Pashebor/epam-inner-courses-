var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var fs = require('fs');
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

var articles = JSON.parse(fs.readFileSync('./articles.json', 'utf8'));

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

        articles.forEach(function(item, i) {
               if (articles[i].id === deleteArt) {
                   var index = articles.indexOf(articles[i]);
                   articles.splice(index, 1);
               }
        });

        res.send(deleteArt);
        fs.writeFile('./articles.json', JSON.stringify(articles, null, 4), callback);
    }

    deleteArticle(datId, function(error) {
        if (error) {
            res.status(404).send('The record did not deleted');
        }
    });

});



app.put('/articles_data/:id', function (req, res) {

    var articleId = req.params.id;

    var addedArticle = req.body;

    function saveEditedArticle(editedArt, callback) {

        addTagAndTime(editedArt);

        articles.forEach(function(item) {
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
        editedArt.id = articleId;
        res.send(editedArt);
        fs.writeFile('./articles.json', JSON.stringify(articles, null, 4), callback);
    }

    saveEditedArticle(addedArticle, function(err) {
        if (err) {
            res.status(404).send('Data not saved');
        }
    });
});

app.post('/articles_data', function(req, res) {

    var article = req.body;

    function createArticle(data, callback) {
        var objData = {};
        var ids = [], largestDigitID;

        addTagAndTime(data);


        articles.forEach(function(item) {
          ids.push(item.id)});

          if (ids.length === 0) {
            ids[0] = 0;
          }

          largestDigitID = Math.max.apply(Math, ids);

          data.id = "" + (largestDigitID + 1);
          articles.push(data);
          objData.respDataCreate = data;
          res.send(objData);
          fs.writeFile('./articles.json', JSON.stringify(articles, null, 4), callback);

    }

    createArticle(article, function (error) {
        if (error) {
            res.status(404).send('Data not created');
        }
    })
});



app.get('/articles_data/:id', function(req, res) {
      var idToEdit = req.params.id;

         articles.forEach( function (item) {
             if (item.id === idToEdit) {
                 res.send(item);
             }
         });
});

app.get('/articles_data', function(req, res) {
    res.send(JSON.stringify(articles));
});

app.listen(3000, function () {
    console.log(' RacoonApp listening on port 3000!');
});
