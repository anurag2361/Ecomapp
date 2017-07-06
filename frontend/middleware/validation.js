var mongoose = require('mongoose');
var userModel = mongoose.model('user');
module.exports.emailExist = function (req, res, next) {
    userModel.findOne({ 'email': req.body.email }, function (err, result) {
        if (err) {
            res.render('message',
                {
                    title: "Error",
                    msg: "Some error",
                    status: 500,
                    error: err,
                    user: req.session.user
                });
        }
        else if (result) {
            res.render('message',
                {
                    title: "Error",
                    msg: "User exists",
                    status: 500,
                    error: "",
                    user: req.session.user
                });

        }
        else {
            next();
        }
    });

};