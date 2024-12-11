const restaurantController = require('../../controllers/restaurant.controller');
const Model = require('../../models/restaurantModel');
const httpMocks = require('node-mocks-http');

const newRestaurant = require('../mockData/new-restaurant.json');
const foundRestaurant = require('../mockData/found-restaurant.json');
const allRestaurants = require('../mockData/all-restaurants.json');

Model.create = jest.fn();
Model.find = jest.fn();
Model.findOne = jest.fn();
Model.findByIdAndUpdate = jest.fn();
Model.findByIdAndDelete = jest.fn();

let req, res, next;
beforeEach(()=>{
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
})


describe('restaurantController.CreateRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });

    it('Controller has CreateRestaurant function', () => {
        expect(restaurantController).toHaveProperty('CreateRestaurant');
        expect(typeof restaurantController.CreateRestaurant).toBe('function');
    });

    describe('When creating a new restaurant', () => {
        beforeEach(async () => {
            await restaurantController.CreateRestaurant(req, res, next);
        });

        it('Should call Model.create', () => {
            expect(Model.create).toHaveBeenCalledTimes(1);
        });

        it('Should return with status code 201', () => {
            expect(res.statusCode).toBe(201);
            expect(res._isEndCalled()).toBe(true);
        });
    });

    it('Responds with JSON', async () => {
        Model.create.mockResolvedValue(newRestaurant);
        await restaurantController.CreateRestaurant(req, res, next);
        expect(res._getJSONData()).toEqual(newRestaurant);
    });

    it('Handles server side error', async () => {
        const errorMessage = { message: "An error has occured :(" };
        Model.create.mockRejectedValue(errorMessage);
        await restaurantController.CreateRestaurant(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(errorMessage);
    });
});

describe('restaurantController.getAllResturants', () => {
    it('Controller has getAllResturants function', () => {
        expect(restaurantController).toHaveProperty('getAllRestaurants');
        expect(typeof restaurantController.getAllRestaurants).toBe('function');
    });

    describe('When fetching all restaurants', () => {
        beforeEach(() => {
            restaurantController.getAllRestaurants(req, res, next);
        });

        it('Should return with status code 200', () => {
            expect(res.statusCode).toBe(200);
            expect(res._isEndCalled()).toBe(true);
        });

        it('Should call Model.find', () => {
            expect(Model.find).toHaveBeenCalledWith({});
        });
    });

    it('Responds with JSON', async () => {
        Model.find.mockResolvedValue(allRestaurants);
        await restaurantController.getAllRestaurants(req, res, next);
        expect(res._getJSONData()).toEqual(allRestaurants);
    });

    it('Handles server side error', async () => {
        const errorMessage = { message: "An error has occured :(" };
        Model.find.mockRejectedValue(errorMessage);
        await restaurantController.getAllRestaurants(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toEqual(errorMessage);
    });
});


describe('restaurantController.getResturantById', () => {
    it('Controller has getResturantById function', () => {
        expect(restaurantController).toHaveProperty('getResturantById');
        expect(typeof restaurantController.getResturantById).toBe('function');
    });

    describe('When fetching a restaurant by ID', () => {
        beforeEach(() => {
            restaurantController.getResturantById(req, res, next);
        });

        it('Should call Model.findOne', () => {
            expect(Model.findOne).toHaveBeenCalledWith({});
        });

        it('Should return with status code 200', () => {
            expect(res.statusCode).toBe(200);
            expect(res._isEndCalled()).toBe(true);
        });
    });

    it('Responds with JSON', async () => {
        Model.findOne.mockResolvedValue(foundRestaurant);
        await restaurantController.getResturantById(req, res, next);
        expect(res._getJSONData()).toStrictEqual(foundRestaurant);
    });

    it('Handles server side error', async () => {
        const errorMessage = { message: "An error has occured :(" };
        Model.findOne.mockRejectedValue(errorMessage);
        await restaurantController.getResturantById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('restaurantController.modifyResturantsById', () => {
    it('Controller has modifyResturantsById function', () => {
        expect(restaurantController).toHaveProperty('modifyResturantsById');
        expect(typeof restaurantController.modifyResturantsById).toBe('function');
    });

    describe('When modifying a restaurant by ID', () => {
        beforeEach(() => {
            restaurantController.modifyResturantsById(req, res, next);
        });

        it('Should call Model.findByIdAndUpdate', () => {
            expect(Model.findByIdAndUpdate).toHaveBeenCalled();
        });

        it('Should return with status code 200', () => {
            expect(res.statusCode).toBe(200);
            expect(res._isEndCalled()).toBe(true);
        });
    });

    it('Handles server side error', async () => {
        const errorMessage = { message: "An error has occured :(" };
        Model.findByIdAndUpdate.mockRejectedValue(errorMessage);
        await restaurantController.modifyResturantsById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});

describe('restaurantController.deleteResturantsById', () => {
    it('Controller has deleteResturantsById function', () => {
        expect(restaurantController).toHaveProperty('deleteResturantsById');
        expect(typeof restaurantController.deleteResturantsById).toBe('function');
    });

    describe('When deleting a restaurant by ID', () => {
        beforeEach(() => {
            restaurantController.deleteResturantsById(req, res, next);
        });

        it('Should call Model.findByIdAndDelete', () => {
            expect(Model.findByIdAndDelete).toHaveBeenCalled();
        });

        it('Should return with status code 201', () => {
            expect(res.statusCode).toBe(201);
            expect(res._isEndCalled()).toBe(true);
        });
    });

    it('Handles server side error', async () => {
        const errorMessage = { message: "An error has occured :(" };
        Model.findByIdAndDelete.mockRejectedValue(errorMessage);
        await restaurantController.deleteResturantsById(req, res, next);
        expect(res.statusCode).toBe(500);
        expect(res._getJSONData()).toStrictEqual(errorMessage);
    });
});