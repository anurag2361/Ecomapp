var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({

    userId: { type: String, default: "", required: true },
    firstname: { type: String, default: "", required: true },
    lastname: { type: String, default: "", required: true },
    email: { type: String, default: "", required: true },
    password: { type: String, default: "", required: true },
    secureQuestion: { type: String, default: "", required: true },
    secureAnswer: { type: String, default: "", required: true },
    contact: { type: String, default: "Not Provided." },
    houseNumber: { type: String, default: "Not Provided." },
    city: { type: String, default: "Not Provided." },
    state: { type: String, default: "Not Provided." },
    country: { type: String, default: "Not Provided." },
    pin: { type: String, default: "Not Provided." },
    landmark: { type: String, default: "Not Provided." },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    wishlist: []

});
mongoose.model('user', userSchema);