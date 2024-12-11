const restaurantModel = require('../models/restaurantModel');

exports.CreateRestaurant = async (req, res, next) => {    
    try {
        const result = await restaurantModel.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await restaurantModel.find({});
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.getResturantById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const restaurant = await restaurantModel.findOne({ _id: id });
        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.modifyResturantsById = async (req, res, next) => {
    const { id } = req.params;
    const { name, borough } = req.body;

    try {
        const restaurant = await restaurantModel.findByIdAndUpdate(id, { name, borough }, { new: true });
        res.status(200).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.deleteResturantsById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const restaurant = await restaurantModel.findByIdAndDelete(id);
        res.status(201).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};



