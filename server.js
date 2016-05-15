
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

require('./routes')(app);

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || config.get('port'));
console.log("App listening on port " + config.get('port'));