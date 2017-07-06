console.log("Starting the Mean ecom server");

//setting up the admin server
//importing modules
var express=require('express');
var mongoose=require('mongoose');

var bodyParser=require('body-parser');
var cookieParser=require('cookie-parser');
var logger=require('morgan');//used to log http requests

var session=require('express-session');
var sessionStore=require('connect-mongo')(session);//used to establish a connection to MongoDB and store session
var methodOverride=require('method-override');//Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
var port=process.env.port||8000

var path=require('path');// provides utilities for working with file and directory paths.
var fs=require('fs');//file system module.

var app=express();

//invoking parser middlewares
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

//Using morgan to log all requests in dev mode for colored responses
app.use(logger('dev'));

//authorisation middleware
var auth=require('./middleware/authentication.js');

//connecting to mongodb
require('./configuration/database');

//setting up the browser session
/*
name-name of the session
secret-used to sign the session ID cookie
resave-Forces the session to be saved back to the session store, even if the session was never modified during the request.
saveUninitialized-Forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage usage
store-creates a session store instance
 */
app.use(session({
    name: 'meanecom',
    secret:'expresssecret',
    resave:true,
    httpOnly:true,
    saveUninitialized:true,
    store:new sessionStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:80*80*800}
}));

//invoking public folder as static
app.use(express.static(path.resolve(__dirname,'./public')));

//invoking views folder
app.set('views', path.resolve(__dirname,'./server/views'));

//ejs engine. Embedded JavaScript templates. Read at https://www.npmjs.com/package/ejs
app.set('view engine','ejs');

app.use(methodOverride(function(req, res) {  //methodOverride defined upwards. We can use delete here because of it.
    if(req.body && typeof req.body==='object' && '_method' in req.body){
        var method=req.body._method;
        delete req.body._method;
        return method;
    }
}));  

//invoking models files as dynamic
fs.readdirSync("./server/models").forEach(function(file){
    if(file.indexOf(".js")){
        require("./server/models/"+file);
    }
});

//controller files are also dynamic
fs.readdirSync("./server/controllers").forEach(function(file){
    if(file.indexOf(".js")){
        var route=require("./server/controllers/"+file);
        route.controller(app);
    }
});

//404 error
app.use(function(req,res){
    console.log("Page Not Found");
    res.status(404).render('message',
                            {
                                title:"404",
                                msg:"Page Not Found",
                                status:404,
                                error:"",
                                admin:req.session.admin
                            });
});

//application level middleware to set up logged user
var adminModel=mongoose.model('admin');

app.use(function(req,res,next){  //used to see if session is established
    if(req.session && req.session.admin){
        adminModel.findOne({'email':req.session.admin.email},function(err,admin){
            if(admin){
                req.admin=admin;
                delete req.admin.password;
                req.session.admin=admin;
                delete req.session.admin.password;
                next();
            }
        });
    }
    else{
        next();
    }
});

app.listen(port);
console.log('Ecom server end started on port'+port);//defined port is 8000