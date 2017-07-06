var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({

    productName: { type: String, default: "", required: true },
    category: { type: String, default: "", required: true },
    images: [],
    price: { type: Number, default: "", required: true },
    discount: { type: Number, default: "" },
    description: { type: String, default: "" },
    quantity: { type: Number, default: 0 },
    model: { type: String, default: "" },
    brand: { type: String, default: "" },
    size: { type: String, default: "" },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});

mongoose.model('product', productSchema);
