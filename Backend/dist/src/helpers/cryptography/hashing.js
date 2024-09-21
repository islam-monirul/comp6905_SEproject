"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyHash = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = async (str) => {
    const salt = await bcrypt_1.default.genSalt();
    const hash = await bcrypt_1.default.hash(str, salt);
    return hash;
};
exports.hash = hash;
const verifyHash = async (compStr, hashed) => {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(compStr, hashed, (err, same) => {
            if (err)
                return reject(err);
            return resolve(same);
        });
    });
};
exports.verifyHash = verifyHash;
