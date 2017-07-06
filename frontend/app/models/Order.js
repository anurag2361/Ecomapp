var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({

    orderedBy: { type: String, default: "", required: true },
    productId: [],
    productName: [],
    productPrice: [],
    prodQuantity: [],
    uniqueProd: { type: Number, default: "", required: true },
    quantity: { type: Number, default: "", required: true },
    price: { type: String, default: "", required: true },
    orderDate: { type: Date, default: "", required: true },
    payment: { type: String, default: "COD" },
    contact: { type: String, default: "Not Provided." },
    houseNumber: { type: String, default: "Not Provided." },
    city: { type: String, default: "Not Provided." },
    state: { type: String, default: "Not Provided." },
    country: { type: String, default: "Not Provided." },
    pin: { type: String, default: "Not Provided." },
    landmark: { type: String, default: "Not Provided." },
    trackingID: { type: Number, default: "" },
    courierProvider: { type: String, default: "" },
    trackOrder: [],
    deliveryStatus: { type: Number, default: 1 } //pending  1 & delivered then 0 

});

mongoose.model('order', orderSchema);
