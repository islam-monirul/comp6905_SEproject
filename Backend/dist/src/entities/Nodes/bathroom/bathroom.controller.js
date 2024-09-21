"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../../helpers/genericCRUD/router");
const bathroom_service_1 = require("./bathroom.service");
const bathroom_validation_1 = require("./bathroom.validation");
// THIS IS NOT COMPLETED YET, AND IS NOT IN USE
// TODO: add types so you don't pass 'any' as a parameter
const router = (0, router_1.getGenericCRUDRouter)(bathroom_service_1.bathroomService, bathroom_validation_1.bathroomSchemaSchema);
// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }); });
//
exports.default = router;
