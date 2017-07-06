var express = require('express');
var mongoose = require('mongoose');
var auth = require('../../middleware/authentication.js');
var router = express.Router();

var productModel = mongoose.model('product');
var userModel = mongoose.model('user');
var orderModel = mongoose.model('order');

module.exports.controller = function (app) {
    router.get("/checkout/confirmaddress", auth.checkLogin, function (req, res) {
        res.render('checkout',
            {
                title: "Checkout",
                user: req.session.user,
                cart: req.session.cart
            });
    });

    var address = {};

    router.post("/checkout/proceed", auth.checkLogin, function (req, res) {
        address.contact = req.body.contact;
        address.houseNumber = req.body.houseNumber;
        address.city = req.body.city;
        address.state = req.body.state;
        address.country = req.body.country;
        address.pin = req.body.pin;
        address.landmark = req.body.landmark;

        res.render('checkoutfinal',
            {
                title: "Checkout",
                user: req.session.user,
                cart: req.session.cart

            });

    });

    router.get("/checkout/makeorder", auth.checkLogin, function (req, res) {
        var arrID = [];
        var arrQTY = [];
        var arrName = [];
        var arrPrice = [];
        var count = 0;
        for (id in req.session.cart.items) {
            arrID.push(id);
            arrQTY.push(req.session.cart.items[id].quantity);
            arrName.push(req.session.cart.items[id].item.productName);
            arrPrice.push(req.session.cart.items[id].item.price);
            count++;
        }
        today = Date.now();
        var newOrder = new orderModel({
            orderedBy: req.session.user.userId,
            productId: arrID,
            productName: arrName,
            productPrice: arrPrice,
            prodQuantity: arrQTY,
            uniqueProd: count,
            quantity: req.session.cart.totalQuantity,
            price: req.session.cart.totalPrice,
            orderDate: today,
            contact: address.contact,
            houseNumber: address.houseNumber,
            city: address.city,
            state: address.state,
            country: address.country,
            pin: address.pin,
            landmark: address.landmark
        });
        newOrder.save(function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Something is wrong",
                        status: 500,
                        error: err,
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else if (result == undefined || result == null || result == "") {
                res.render('message',
                    {
                        title: "Empty",
                        msg: "Order not placed",
                        status: 500,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                delete req.session.cart;
                res.redirect('/user/orders');
            }
        });
    });
    app.use(router);
}