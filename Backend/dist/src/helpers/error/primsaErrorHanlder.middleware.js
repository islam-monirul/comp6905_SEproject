"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaErrors_1 = __importDefault(require("./prismaErrors"));
const prettyViolationErrorMessage = (error, req) => {
    var _a;
    const { code, meta } = error;
    const name = prismaErrors_1.default.codeToName[code];
    if (name)
        error.name = name;
    if (name === 'UniqueConstraintViolation') {
        let [_model, _field] = (_a = meta === null || meta === void 0 ? void 0 : meta.target) === null || _a === void 0 ? void 0 : _a.split('_');
        // error.message = `
        // ${req.t(model.toLowerCase())} ${req.t(field)} ${req.t(name)}`;
    }
    else if (name === 'RecordsNotFound') {
        let [_, _model, _id] = req.url.split('/');
        // error.message = `${req.t(model)} ${id} ${req.t("RecordsNotFound")}`;
    }
};
// ---------------------------------------------------------------
const prismaErrorHandler = (error, req, _res, next) => {
    const { _code, _meta, _message: m2 } = error;
    error.status = 400;
    prettyViolationErrorMessage(error, req);
    next(error);
};
// ------------------------------------------------
exports.default = prismaErrorHandler;
