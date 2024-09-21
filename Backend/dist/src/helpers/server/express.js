"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchWebServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const restaurant_controller_1 = __importDefault(require("../../entities/Nodes/restaurant/restaurant.controller"));
const controller_1 = __importDefault(require("../../entities/map/controller"));
const bathroom_controller_1 = __importDefault(require("../../entities/Nodes/bathroom/bathroom.controller"));
const liftStation_controller_1 = __importDefault(require("../../entities/Nodes/liftStation/liftStation.controller"));
const slope_controller_1 = __importDefault(require("../../entities/Edges/slope/slope.controller"));
const skiLift_controller_1 = __importDefault(require("../../entities/Edges/skiLift/skiLift.controller"));
const slopeEnd_controller_1 = __importDefault(require("../../entities/Nodes/slopeEnd/slopeEnd.controller"));
const slopeStart_controller_1 = __importDefault(require("../../entities/Nodes/slopeStart/slopeStart.controller"));
const configs_1 = require("../configs");
const api_router_1 = require("../auth/api.router");
const errorHandler_middlerware_1 = require("../error/errorHandler.middlerware");
// =========================================================
async function launchWebServer() {
    const app = (0, express_1.default)();
    // cors config
    app.use((0, cors_1.default)());
    // morgan logger
    app.use((0, morgan_1.default)('dev'));
    // parse JSON request body
    app.use(express_1.default.json());
    // parse `x-www-form-urlencoded` POST request bodies
    app.use(express_1.default.urlencoded({ extended: true }));
    // upload static file path
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    // passport auth
    // app.use(passportAuthenticate())
    app.use('/map', controller_1.default);
    app.use(api_router_1.restApiRouter);
    app.use('/node/restaurant', restaurant_controller_1.default);
    app.use('/node/bathroom', bathroom_controller_1.default);
    app.use('/node/liftStation', liftStation_controller_1.default);
    app.use('/node/slopeStart', slopeStart_controller_1.default);
    app.use('/node/slopeEnd', slopeEnd_controller_1.default);
    app.use('/edge/slope', slope_controller_1.default);
    app.use('/edge/skiLift', skiLift_controller_1.default);
    // Error Handling
    app.use(errorHandler_middlerware_1.errors);
    // Error Handling
    // app.use(errors)
    // Server listening
    const PORT = configs_1.configs.PORT;
    app.listen(PORT, () => {
        console.dir(`server is listening on port ${PORT}...`);
    });
    return app;
}
exports.launchWebServer = launchWebServer;
// =========================================================
