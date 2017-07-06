var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new Schema({
    userId:{type:String,default:"",required:true},
    firstname:{type:String,default:"",required:true},
    lastname:{type:String,default:"",required:true},
    email:{type:String,default:"",required:true},
    password:{type:String,default:"",required:true},
    securityQuestion:{type:String,default:"",required:true},
    securityAnswer:{type:String,default:"",required:true},
    contact:{type:String,default:"NA"},
    houseNumber:{type:String,default:"NA"},
    city:{type:String,default:"NA"},
    state:{type:String,default:"NA"},
    country:{type:String,default:"NA"},
    pin:{type:Number,default:"NA"},
    landmark:{type:String,default:"NA"},
    created:{type:Date,default:Date.now},
    updated:{type:Date,default:Date.now},
    wishList:[]
});

mongoose.model('user',userSchema);