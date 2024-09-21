"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityWithModifiedNode = void 0;
const entityWithModifiedNode = (entity) => {
    const { node: { type, name, coordinates }, ...rest } = entity;
    return { ...rest, name, type, coordinates };
};
exports.entityWithModifiedNode = entityWithModifiedNode;
