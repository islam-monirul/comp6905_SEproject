"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../../helpers/genericCRUD/router");
const restaurant_service_1 = require("./restaurant.service");
const restaurant_validation_1 = require("./restaurant.validation");
// THIS IS NOT COMPLETED YET, AND IS NOT IN USE
// TODO: add types so you don't pass 'any' as a parameter
const CRUDOperations = {
    create: restaurant_service_1.restaurantService.create,
    getMany: restaurant_service_1.restaurantService.getMany,
    getOne: restaurant_service_1.restaurantService.getOne,
    updateOne: restaurant_service_1.restaurantService.updateOne,
    deleteOne: restaurant_service_1.restaurantService.deleteOne,
};
const router = (0, router_1.getGenericCRUDRouter)(CRUDOperations, restaurant_validation_1.restaurantSchema);
// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }); });
//
exports.default = router;
