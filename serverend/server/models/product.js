var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var productSchema=new Schema({
    productName:{type:String,default:"",required:true},
    category:{type:String,required:true},
    rating:{type:Number,default:0},
    images:[{data:Buffer,contentType:String}],
    price:{type:Number,default:"",required:true},
    discount:{type:Number,default:""},
    description:{type:String,default:"Not Specified"},
    quantity:{type:Number,default:0},
    size:{type:String,default:"Not Specified"},
    color:{type:String,default:"Not Specified"},
    model:{type:String,default:"Not Specified"},
    brand:{type:String,default:"Not Specified"},
    created:{type:Date,default:Date.now},
    updated:{type:Date,default:Date.now},
    url:{type:String}
});

mongoose.model('product',productSchema);