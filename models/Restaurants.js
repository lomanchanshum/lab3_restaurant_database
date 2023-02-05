const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address: {
        "building": {
          type: String,
          trim: true
        },
        "street": {
          type: String,
          required: [true, "Please enter street name"],
          trim: true,
          lowercase: true
        },
        "zipcode": {
          type: String,
          trim: true
        }
      },
      city:{
        type: String,
        required: true,
        trim: true
      },
      cuisine: {
        type: String,
        required: [true, "Please enter cuisine"],
        trim: true,
        lowercase: true
      },
      name: {
        type: String,
        required: [true, "Please enter name"],
        trim: true,
        lowercase: true
      },
      
      restaurant_id:{
        type: Number,
        required: [true, "Please enter restaurant_id"],
        trim: true
      }
    
    });


const Restaurants = mongoose.model("Restaurants", RestaurantSchema);
module.exports = Restaurants;