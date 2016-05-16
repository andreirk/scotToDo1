
// set up ========================
var express  = require('express');
var app      = express();                       
var mongoose = require('./libs/mongoose');      
var morgan = require('morgan');                 
var bodyParser = require('body-parser');        
var methodOverride = require('method-override');
var config = require('./config');

// configuration =================

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());

var Todo = require('./models/todo').Todo;

// routes ======================================================================

//require('./routes')(app);
app.get('/api/todos', function(req, res) {

    console.log('get api here');
    Todo.find(function(err, todos) {


        if (err)
            console.log('error hapend');
            res.send(err);

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    console.log('post api here');
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);


        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after  another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '../public/index.html');
});

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || config.get('port'));
console.log("App listening on port " + config.get('port'));