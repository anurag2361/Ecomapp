var express = require('express');
var mongoose = require('mongoose');
var auth = require('../../middleware/authentication.js');
var router = express.Router();
var productModel = mongoose.model('product');

module.exports.controller = function (app) {
    router.get("/viewproduct", auth.isLoggedIn, function (req, res) {
        productModel.find({}, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Something is wrong",
                        status: 500,
                        error: err,
                        admin: req.session.admin
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
                                admin: req.session.admin
                            });
                    }
                    else {
                        res.render('viewproduct',
                            {
                                title: "View Product",
                                admin: req.session.admin,
                                product: result,
                                count: count
                            });
                    }
                });
            }
        });
    });
    router.get("/viewproduct/single/:id", auth.isLoggedIn, function (req, res) {
        productModel.findOne({ "_id": req.params.id }, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some error occured",
                        status: 500,
                        error: err,
                        admin: req.session.admin
                    });
            }
            else if (result == undefined || result == null || result == "") {
                res.render('viewsingleproduct',
                    {
                        title: "Single Product",
                        admin: req.session.admin,
                        product: null
                    });
            }
            else {
                res.render('viewsingleproduct',
                    {
                        title: "Single Product",
                        admin: req.session.admin,
                        product: result
                    });
            }
        });
    });
    app.use("/admin", router);

}