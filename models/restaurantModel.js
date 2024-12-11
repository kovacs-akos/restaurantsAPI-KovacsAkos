const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    name:{
        type: String,
        required: true        
    },
    borough:{
        type: String,
        required: true        
    }
});

module.exports = mongoose.model('restaurant', restaurantSchema);