var mongoose = require('./../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    text : String
});

exports.Todo = mongoose.model('Todo', schema);