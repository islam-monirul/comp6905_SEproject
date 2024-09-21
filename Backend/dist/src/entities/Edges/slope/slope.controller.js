"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../../helpers/genericCRUD/router");
const slope_service_1 = require("./slope.service");
const slope_validation_1 = require("./slope.validation");
const router = (0, router_1.getGenericCRUDRouter)(slope_service_1.slopeService, slope_validation_1.slopeSchema);
// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }); });
//
exports.default = router;
