var express = require('express');

var mongojs = require('mongojs')
var bodyParser = require('body-parser');
var app = express();
//app.use(express.bodyParser());

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



var connectionString = 'mongodb://heroku_8hnlgmrd:kjfqi8lfbtcqt1ntn5cgfgcoq0@ds041581.mongolab.com:41581/heroku_8hnlgmrd'
var db = mongojs(connectionString, ['dailyInvest', 'members'])


// set cross origin header to allow cross-origin request.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.text());



var productInfo = {
    "name": "Mango & Banana",
    "price": "130",
    "date": "20/6/2015",
    "payee": "saeed",
    "distributies": ["saeed", "anas", "umair"]

};

app.get('/login', function(req, res) {
    res.render('pages/login');
});

app.get('/viewMembers', function(req, res) {
    res.render('pages/viewMembers');
});

app.get('/addItemInfo', function(req, res) {
    res.render('pages/addItemInfo');
});

app.get('/addMember', function(req, res) {
    res.render('pages/addMember');
});

app.get('/viewexpense', function(req, res) {
    res.render('pages/viewexpense');
});



//....................For mongo.....................//

app.get('/members', function(req, res) {
    db.collection('members').find(function(err, docs) {
        res.send(JSON.stringify(docs));
    });
});

app.get('/dailyInvest', function(req, res) {
    db.collection('dailyInvest').find(function(err, docs) {
        res.send(JSON.stringify(docs));
    });
});

app.post('/postMembers', function(req, res) {
    req.on('data', function(data) {
        db.collection('members').insert(JSON.parse(data), function(err, doc) {
            if (!err) {
                res.send(doc);
            }
        });
    });
});

app.delete('/delete', function(req, res) {
    db.collection('members').remove({
        '_id': db.ObjectId(req.body)
    }, function(err, doc) {
        res.send('Deleted member id:  ::: ' + JSON.stringify(doc));
    });
});

app.post('/saveData', function(req, res) {
    req.on('data', function(data) {
        db.collection('dailyInvest').insert(JSON.parse(data), function(err, doc) {
            if (!err) {
                res.send(doc);
            }
        });
    });
});

//......................End of mongo.............................//

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
