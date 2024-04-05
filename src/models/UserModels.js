const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    id: Number,
    name: String,
    age: Number,
    city: String
});

const UserModels = mongoose.model('user', user);
module.exports = UserModels;