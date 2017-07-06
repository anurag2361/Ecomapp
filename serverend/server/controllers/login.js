var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var adminModel = mongoose.model('admin');

module.exports.controller = function (app) {
    router.get('/login', function (req, res) {
        console.log("Admin Login accessed");
        res.render('login', { title: "Ecom Admin Login" });
    });
    router.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some error occured",
                        status: 500,
                        error: err,
                        admin: req.session.admin
                    });
            }
            else {
                res.redirect('/admin/login');
            }
        });
    });
    //login api
    router.post('/api/v1/login', function (req, res) {
        adminModel.findOne({ $and: [{ 'username': req.body.username }, { 'password': req.body.password }] }, function (err, result) {
            if (err) {
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some error occured",
                        status: 500,
                        error: err,
                        admin: req.session.admin
                    });
            }
            else if (result === null || result === undefined) {
                res.render('message',
                    {
                        title: "Error",
                        msg: "No User Found",
                        status: 404,
                        error: "",
                        admin: req.session.admin
                    });
            }
            else {
                req.admin = result;
                delete req.admin.password;
                req.session.admin = result;
                delete req.session.admin.password;
                res.redirect('/admin');
            }
        });
    });
    app.use('/admin', router);
}