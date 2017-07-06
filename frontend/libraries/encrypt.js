var crypt = require('crypto');
module.exports.encryptPassword = function (password) {
    var hash = crypt.createHmac('sha256', password)
        .update("ecomkey")
        .digest('hex');
    return hash
};