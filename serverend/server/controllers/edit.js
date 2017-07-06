var express = require('express');
var mongoose = require('mongoose');
var auth = require('../../middleware/authentication.js');
var router = express.Router();
var productModel = mongoose.model('product');

module.exports.controller = function (app) {
    router.get("/editproduct/:id", auth.isLoggedIn, function (req, res) {
        productModel.findById({ '_id': req.params.id }, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Some Error Occured",
                        status: 500,
                        error: err,
                        admin: req.session.admin
                    });
            }
            else if (result === undefined || result === null || result === "") {
                res.render('message',
                    {
                        title: "Product Not Found",
                        msg: "Product Does Not Exist",
                        status: 404,
                        error: "",
                        admin: req.session.admin
                    });
            }
            else {
                res.render('editproduct',
                    {
                        title: "Product Being Edited",
                        admin: req.session.admin,
                        product: result
                    });
            }
        });
    });

    //api to edit product
    router.put("/api/v1/product/edit/:id", auth.isLoggedIn, function (req, res) {
        req.body.updated = Date.now();
        var update = req.body;

        productModel.findByIdAndUpdate({ '_id': req.params.id }, update, function (err, result) {
            if (err) {
                console.log(err);
                res.render('message',
                    {
                        title: "Error",
                        msg: "Something wrong with product update",
                        status: 500,
                        error: err,
                        admin: req.session.admin
                    });
            }
            else if (result === undefined || result === null || result === "") {
                res.render('message',
                    {
                        title: "Product Not Found",
                        msg: "Product Does Not Exists",
                        status: 404,
                        error: "",
                        admin: req.session.admin
                    });
            }
            else {
                productModel.findOne({ '_id': req.params.id }, function (err, newResult) {
                    res.render('viewsingleproduct',
                        {
                            title: "Product",
                            admin: req.session.admin,
                            product: newResult
                        });
                });
            }
        });
    });

    app.use("/admin", router);
}