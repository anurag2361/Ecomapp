var express=require('express');
var mongoose=require('mongoose');
var auth=require('../../middleware/authentication.js');

var router=express.Router();
var productModel=mongoose.model('product');
module.exports.controller=function(app){
    router.get("/createproduct",auth.isLoggedIn,function(req,res){
        res.render('createproduct',
                   {
                       title:"Add Product",
                       admin:req.session.admin
                   });
    });

    router.post("/api/v1/product/create",function(req,res){
        console.log("product create api called");
        var today=Date.now();
        var newProduct=new productModel({
            productName:req.body.productName,
            category:req.body.category,
            price:req.body.price,
            description:req.body.description,
            quantity:req.body.quantity,
            model:req.body.model,
            brand:req.body.brand,
            size:req.body.size,
            created:today,
            updated:today,
            url:req.body.productName+(0|Math.random()*9e6).toString(36)//done to generate a unique url of product
        });

        //saving product
        newProduct.save(function(err,result){
            if(err){
                console.log(err);
                res.render('message',
                           {
                               title:"Error",
                               msg:"Something is wrong!",
                               status:500,
                               error:err,
                               admin:req.session.admin
                           });
            }
            else if(result==undefined||result==null||result==""){
                res.render('message',
                           {
                               title:"Product not created",
                               msg:"Something is wrong",
                               status:404,
                               error:"",
                               admin:req.session.admin
                           });
            }
            else{
                res.redirect('/admin/viewproduct');
            }
        });
    });
    app.use("/admin",router);
}