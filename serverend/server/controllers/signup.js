var express = require('express');
var mongoose = require('mongoose');
var auth = require('../../middleware/authentication.js');
var router = express.Router();
var adminModel = mongoose.model('admin');

module.exports.controller = function (app) {
    router.get("/signup", function (req, res) {
        res.render('signup',
            {
                title: "New Admin Signup",
                admin: req.session.admin
            });
    });

    router.post("/signup", function (req, res) {
        var today = Date.now();
        var newAdmin = new adminModel({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            created: today
        });

        newAdmin.save(function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Something is wrong",
                        status: 500,
                        error: err
                    });
            }
            else if (result == undefined || result == null || result == "") {
                res.render('message',
                    {
                        title: "Admin singup failed",
                        msg: "Admin signup failed",
                        status: 500,
                        error: ""
                    });
            }
            else {
                req.admin = result;
                delete req.admin.password;
                req.session.admin = result;
                delete req.session.admin.password;
                res.redirect("/admin");
            }
        });
    });
    app.use("/admin", router);
}