var express = require('express');
var mongoose = require('mongoose');
var cart = require('../../libraries/guestcart');
var router = express.Router();
var userModel = mongoose.model('user');
var productModel = mongoose.model('product');

module.exports.controller = function (app) {
    router.get("/cart", function (req, res) {
        res.render('cart',
            {
                title: "Your Cart",
                user: req.session.user,
                cart: req.session.cart
            });
    });
    router.get("/cart/empty", function (req, res) {
        delete req.session.cart;
        res.redirect("/cart");
    });

    router.get("/product/addtocart/:id", function (req, res) {
        productModel.findOne({ '_id': req.params.id }, function (err, result) {
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
            else if (result == undefined || result == null || result == "") {
                res.render('message',
                    {
                        title: "Not Found",
                        msg: "Product Doesnt Exists",
                        status: 404,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                var oldcart = req.session.cart;
                req.session.cart = cart.addProduct(oldcart, result, req.params.id);
                req.cart = req.session.cart;

                res.redirect("/cart");
            }
        });
    });
    router.get("/product/deletefromcart/:id", function (req, res) {
        var oldcart = req.session.cart;
        req.session.cart = cart.deleteProduct(oldcart, req.params.id);
        req.cart = req.session.cart;

        res.redirect("/cart");
    });

    router.get("/product/addOnetocart/:id", function (req, res) {
        var oldcart = req.session.cart;
        req.session.cart = cart.addOne(oldcart, req.params.id);
        req.cart = req.session.cart;

        res.redirect("/cart");
    });
    router.get("/product/deleteOnefromcart/:id", function (req, res) {
        var oldcart = req.session.cart;
        req.session.cart = cart.deleteOne(oldcart, req.params.id);
        req.cart = req.session.cart;

        res.redirect("/cart");
    });

    app.use(router);
}