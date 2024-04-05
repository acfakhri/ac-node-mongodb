const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    nama : String,
    deskripsi : String, 
    stok: Number,
    harga: String,
    image: {
        data: Buffer,
        contentType: String
        }
    });

const ProductModels = mongoose.model('products', product);
module.exports = ProductModels;