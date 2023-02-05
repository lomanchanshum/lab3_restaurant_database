const express = require('express');
const restaurantModel = require('../models/Restaurants');
const app = express();


// Task 4:	Create REST API to return all restaurant details
// Select all the columns
// http://localhost:3000/restaurants

// Task 6.	Create REST API to return the 
// -	The selected columns must include id, cuisines, name, city, resturant_id
// -	The sorting by the restaurant_id in Ascending or Descending Order based on parameter passed.

// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC

app.get('/restaurants', async (req, res) => {
    const sortBy = req.query.sortBy

    if (sortBy == null) {
        restaurants = await restaurantModel.find({});
        try {
            res.status(200).send(restaurants);
          } catch (err) {
            res.status(500).send(err);
          }
    } else {
        if (Object.keys(req.query).length != 1) {
            res.send(JSON.stringify({ status: false, message: "Insufficient query parameter" }))
        } else {
            const restaurants = await restaurantModel.find({}).select("_id cuisine name city restaurant_id").sort({ 'restaurant_id': sortBy });
            try {
                if (restaurants.length != 0) {
                    res.send(restaurants);
                } else {
                    res.send(JSON.stringify({ status: false, message: "No data found" }))
                }
            } catch (err) {
                res.status(500).send(err);
            }
        }
    }
});





// Task 5.	Create REST API to return all restaurant details by cuisine
// -	Select all the columns

// http://localhost:3000/restaurants/cuisine/Japanese
// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine
    const restaurants = await restaurantModel.find({ cuisine: cuisine });

    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(JSON.stringify({ status: false, message: "No data found" }))
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// Task 7.	Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
// -	The selected columns must include cuisines, name and city, but exclude id
// -	The sorting order must be Ascending Order on the name

// http://localhost:3000/restaurants/Delicatessen

app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
      const restaurants = restaurantModel.
                          find({city: {$ne: "Brooklyn"}})

                          .where('cuisine').equals('Delicatessen')
                          .sort('name')
                          .select('-_id cuisine name city')
                          .exec((err, data) => {
                            if (err){
                                res.send(JSON.stringify({status:false, message: "No data found"}));
                            }else{
                                res.send(data);
                            }
                          });
      } catch (err) {
        res.status(500).send(err);
      }
  });

module.exports = app

//Insert Multiple Records
// restaurantModel.create(
//     [{
//         "address": {
//             "building": "1008",
//             "street": "Morris Park Ave",
//             "zipcode": "10462"
//         },
//         "city": "Bronx",
//         "cuisine": "Bakery",
//         "name": "Morris Park Bake Shop",
//         "restaurant_id": "30075445"
//     },
//     {
//         "address": {
//             "street": "Thai Son Street",
//             "zipcode": null
//         },
//         "city": "Manhattan",
//         "cuisine": "Vietnamese",
//         "name": "Pho Me Long Time",
//         "restaurant_id": "30075455"
//     },
//     {
//         "address": {
//             "building": "253",
//             "street": "East 167 Street",
//             "zipcode": null
//         },
//         "city": "Bronx",
//         "cuisine": "Chicken",
//         "name": "Mom's Fried Chicken",
//         "restaurant_id": "40382900"
//     },
//     {
//         "address": {
//             "building": "120",
//             "street": "East 56 Street",
//             "zipcode": "19800"
//         },
//         "city": "Mahattan",
//         "cuisine": "Italian",
//         "name": "Montebello Restaurant",
//         "restaurant_id": "40397082"
//     },
//     {
//         "address": {
//             "building": "195",
//             "street": "Soprano Street",
//             "zipcode": "17500"
//         },
//         "city": "Staten Island",
//         "cuisine": "Hamburgers",
//         "name": "Joeys Burgers",
//         "restaurant_id": "40397555"
//     },
//     {
//         "address": {
//             "building": "200",
//             "street": "Queens Boulevard",
//             "zipcode": "19700"
//         },
//         "city": "Queens",
//         "cuisine": "American",
//         "name": "Brunos on the Boulevard",
//         "restaurant_id": "40397678"
//     },
//     {
//         "address": {
//             "building": "555",
//             "street": "Sushi Street",
//             "zipcode": "17700"
//         },
//         "city": "Brooklyn",
//         "cuisine": "Japanese",
//         "name": "Iron Chef House",
//         "restaurant_id": "40397699"
//     },
//     {
//         "address": {
//             "building": "555",
//             "street": "Fontana Street",
//             "zipcode": null
//         },
//         "city": "Brooklyn",
//         "cuisine": "Japanese",
//         "name": "Wasabi Sushi",
//         "restaurant_id": "40398000"
//     },
//     {
//         "address": {
//             "building": "900",
//             "street": "Goodfellas Street",
//             "zipcode": "17788"
//         },
//         "city": "Brooklyn",
//         "cuisine": "Delicatessen",
//         "name": "Sal's Deli",
//         "restaurant_id": "40898000"
//     },
//     {
//         "address": {
//             "building": "909",
//             "street": "44 Gangster Way",
//             "zipcode": "17988"
//         },
//         "city": "Queens",
//         "cuisine": "Delicatessen",
//         "name": "Big Tony's Sandwich Buffet",
//         "restaurant_id": "40898554"
//     },
//     {
//         "address": {
//             "building": "1201",
//             "street": "121 Canolli Way",
//             "zipcode": "17989"
//         },
//         "city": "Queens",
//         "cuisine": "Delicatessen",
//         "name": "The Godfather Panini Express",
//         "restaurant_id": "40898554"
//     }]
// )