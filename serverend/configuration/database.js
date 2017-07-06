//Database setup
var mongoose=require('mongoose');

//defining database path and establishing connection
var dbpath="mongodb://localhost/meanecom";
mongoose.connect(dbpath);
mongoose.connection.once('open',function(){
    console.log("Connected to Database");
});