var Todo = require('../models/todo').Todo;



module.exports = function (app) {
// api ---------------------------------------------------------------------
// get all todos
    app.get('/api/todos', function(req, res) {

        
        Todo.find(function(err, todos) {

            
            if (err)
                res.send(err)

            res.json(todos); // return all todos in JSON format
        });
    });

// create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

        
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

}