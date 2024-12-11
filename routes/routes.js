const express = require('express'); 
const router = express.Router(); 
const restaurantController = require('../controllers/restaurant.controller');

router.post('/create', restaurantController.CreateRestaurant);

router.get('/get-all', restaurantController.getAllRestaurants);

router.get('/:id', restaurantController.getResturantById);

router.put('/:id', restaurantController.modifyResturantsById);

router.delete('/:id', restaurantController.deleteResturantsById);


module.exports = router;
