var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogcc');
// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});



app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var PostSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: String,
    tag: {type: String, enum: ['Vacation', 'Daily', 'Wow']},
    posted: {type: Date, default: Date.now}
});

var PostModel = mongoose.model("PostModel", PostSchema);
app.post("/api/blogpost", createPost);

function createPost(req, res) {
    // body...
    var post = req.body;
    console.log(post);
    PostModel.create(post);
    res.json(post);
}

app.listen(3000);