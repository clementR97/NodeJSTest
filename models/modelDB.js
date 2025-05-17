const mongoose = require('mongoose');

const productShema = mongoose.Schema({
    name : {type:String, require :true},
    description : {type:String, require :true},
    price : {type:String, require :true},
    inStock : {type:String,require:true}
});
module.exports = mongoose.model('product',productShema);