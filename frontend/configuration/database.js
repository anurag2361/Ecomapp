var mongoose=require('mongoose');
var dbpath="mongodb://localhost/meanecom";
mongoose.connect(dbpath);
mongoose.connection.once('open',function(){
    console.log("Connected to Database");
});