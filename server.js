var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deer');

var DeerSchema = new mongoose.Schema({
	name: String,
	weight: Number,
	color: String,
	created_at: {type: Date, default: new Date}
})

var Deer = mongoose.model('Deer', DeerSchema);

DeerSchema.path('color').required(true, 'Color cannot be blank');
DeerSchema.path('weight').required(true, 'Weight cannot be blank');
DeerSchema.path('name').required(true, 'Name cannot be blank');

 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var path = require("path");
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
var route = require('./routes/index.js')(app, Deer);
app.listen(8000, function() {
    console.log("listening on port 8000");
})