"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../../helpers/genericCRUD/router");
const slopeEnd_service_1 = require("./slopeEnd.service");
const slopeEnd_validation_1 = require("./slopeEnd.validation");
// THIS IS NOT COMPLETED YET, AND IS NOT IN USE
// TODO: add types so you don't pass 'any' as a parameter
const router = (0, router_1.getGenericCRUDRouter)(slopeEnd_service_1.slopeEndService, slopeEnd_validation_1.slopeEndSchema);
// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }); });
//
exports.default = router;
