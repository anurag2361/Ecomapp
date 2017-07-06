var express=require('express');
var mongoose=require('mongoose');
var sync=require('synchronize');//runs asynchronous function as synchronous
var auth=require('../../middleware/authentication.js');

//invoking ExpressJS router for GET operation
var router=express.Router();

//invoking various models
var adminModel=mongoose.model('admin');
var productModel=mongoose.model('product');
var userModel=mongoose.model('user');
var orderModel=mongoose.model('order');

module.exports.controller=function(app){
    router.get('/',auth.isLoggedIn,function(req,res){
        console.log("Admin DashBoard");

        //now using synchronize
        try{
            sync.fiber(function(){
                //synchronizing products
                productS=sync.await(productModel.count({},sync.defer()));
                //synchronizing users
                userS=sync.await(userModel.count({},sync.defer()));
                //synchronizing orders
                orderS=sync.await(orderModel.count({},sync.defer()));
                //synchronizing delivery status
                deliveryStatusS=sync.await(orderModel.count({'deliveryStatus':true},sync.defer()));

                res.render('dashboard',//rendered in ejs
                            {
                                title:"Ecom Admin Dashboard",
                                admin:req.session.admin,
                                totalProduct:productS,
                                totalUser:userS,
                                totalOrder:orderS,
                                pendingOrder:deliveryStatusS

                            });
            });

        }catch(err){
            console.log("error "+err);
        }
    });

    app.use('/admin', router);
}