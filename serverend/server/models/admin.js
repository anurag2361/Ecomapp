var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var adminSchema=new Schema({
    username:{type:String,default:"",required:true,unique:true},
    firstname:{type:String,default:""},
    lastname:{type:String,default:""},
    email:{type:String,default:"",required:true,unique:true},
    password:{type:String,default:"",required:true},
    created:{type:Date,default:Date.now},
    updated:{type:Date,default:Date.now}
});

mongoose.model('admin',adminSchema);