var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

var productModel = mongoose.model('product');

module.exports.controller = function (app) {
    router.get("/", function (req, res) {
        productModel.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Something wrong",
                        status: 500,
                        error: err,
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                productModel.count({}, function (err, count) {
                    if (err) {
                        console.log(err);
                        res.render('message',
                            {
                                title: "Error",
                                msg: "Some error",
                                status: 500,
                                error: err,
                                user: req.session.user,
                                cart: req.session.cart
                            });
                    }
                    else {
                        res.render('home',
                            {
                                title: "Ecom app",
                                user: req.session.user,
                                cart: req.session.cart,
                                product: result,
                                count: count
                            });
                    }
                });
            }
        });
    });
    router.get('/product/singleproduct/:id', function (req, res) {
        productModel.findOne({ '_id': req.params.id }, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some error",
                        status: 500,
                        error: err,
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else if (result == undefined || result == null || result == "") {
                res.render('mesage',
                    {
                        title: "Not found",
                        msg: "Product Doesn't Exists",
                        status: 404,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                res.render('singleproduct',
                    {
                        title: "Product Details",
                        user: req.session.user,
                        cart: req.session.cart,
                        product: result
                    });
            }
        });
    });
    app.use(router);
}