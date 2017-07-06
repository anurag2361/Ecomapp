var express = require('express');
var mongoose = require('mongoose');
var encrypt = require('../../libraries/encrypt');
var auth = require('../../middleware/authentication');
var router = express.Router();

var userModel = mongoose.model('user');
module.exports.controller = function (app) {
    router.get("/forgotpassword/stepone", auth.loggedIn, function (req, res) {
        res.render('forgotpassword',
            {
                title: "Forgot Password",
                user: req.session.user,
                cart: req.session.cart,
                step: 1
            });
    });
    router.post("/forgotpassword/steptwo", auth.loggedIn, function (req, res) {
        userModel.findOne({ 'email': req.body.email }, function (err, result) {
            if (err) {
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some error occured",
                        status: 500,
                        error: err,
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else if (result == null || result == undefined || result == "") {
                res.render('message',
                    {
                        title: "Error",
                        msg: "User not found",
                        status: 404,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                res.render('forgotpassword',
                    {
                        title: "Forgot Password",
                        user: req.session.user,
                        cart: req.session.cart,
                        step: 2,
                        userId: result.userId,
                        question: result.secureQuestion
                    });
            }
        });
    });
    router.post("/forgot-password/step-final", auth.loggedIn, function (req, res) {

        userModel.findOne({ $and: [{ 'userId': req.body.userId }, { 'secureAnswer': req.body.secureAnswer }] }, function (err, result) {
            if (err) {
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some Error Occured During Login.",
                        status: 500,
                        error: err,
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else if (result == null || result == undefined || result == "") {
                res.render('message',
                    {
                        title: "Error",
                        msg: "User Not Found. Please Check Your Answer.",
                        status: 404,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });
            }
            else {
                res.render('forgot-password',
                    {
                        title: "Forgot Password - MEAN Shop",
                        user: req.session.user,
                        cart: req.session.cart,
                        step: 3,
                        userId: result.userId
                    });
            }
        });
    });

    router.put("/forgotpassword/change", auth.loggedIn, function (req, res) {

        //encrypt
        var epass = encrypt.encryptPassword(req.body.password);

        req.body.updated = Date.now();
        req.body.password = epass;

        var update = req.body;

        userModel.findOneAndUpdate({ 'userId': req.body.userId }, update, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some Error Occured During Updation.",
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
                        msg: "User Does Not Exist.",
                        status: 404,
                        error: "",
                        user: req.session.user,
                        cart: req.session.cart
                    });

            }
            else {
                res.redirect('/user/login');
            }
        });
    });

    app.use("/user", router);

}