var mongoose=require('mongoose');

var Schema=mongoose.Schema;
var orderSchema=new Schema({
    
    productId:[],
    productName:[],
    orderedBy:{type:String,default:"",required:true},
    productPrice:[],
    prodQuantity:[],
    uniqueProd:{type:Number,default:"",required:true},
    quantity:{type:Number,default:"",required:true},
    price:{type:String,default:"",required:true},
    orderDate:{type:Date,default:"",required:true},
    payment:{type:String,default:"Cash On Delivery"},
    contact:{type:String,default:"NA"},
    houseNumber:{type:String,default:"NA"},
    city:{type:String,default:"NA"},
    state:{type:String,default:"NA"},
    country:{type:String,default:"NA"},
    pin:{type:String,default:"NA"},
    landmark:{type:String,default:"NA"},
    trackingID:{type:Number,default:""},
    courierProvider:{type:String,default:""},
    trackOrder:[],
    deliveryStatus:{type:Number,default:1} //1 if pending, 0 if delivered

});

//create model
mongoose.model('order',orderSchema);