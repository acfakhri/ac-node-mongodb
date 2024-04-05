const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    id: Number,
    name: String,
    age: Number,
    city: String
});

const UserModels = mongoose.model('UserModels', user);
module.exports = UserModels;