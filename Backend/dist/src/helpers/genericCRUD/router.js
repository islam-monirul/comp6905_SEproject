"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGenericCRUDRouter = void 0;
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const error_1 = require("../error/error");
const asyncHandler_1 = require("../asyncHandler/asyncHandler");
const idSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/);
const getGenericCRUDRouter = (GenericCRUDOperations, entitySchema) => {
    const router = express_1.default.Router();
    // Create Operation - POST
    router.post('/', (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = entitySchema.parse(req.body);
        const entity = await GenericCRUDOperations.create(data);
        return entity;
    }));
    // Read All Operation - GET
    router.get('/', async (req, res) => {
        const entities = await GenericCRUDOperations.getMany();
        res.json(entities);
    });
    // Read Single Operation - GET
    router.get('/:id', async (req, res) => {
        try {
            const id = idSchema.parse(req.params.id);
            const entity = await GenericCRUDOperations.getOne(id);
            if (!entity) {
                return (0, error_1.MyError)(404, "entity not found");
            }
            res.json(entity);
        }
        catch (error) {
            res.status(400).json({ error: 'Invalid item ID' });
        }
    });
    // Update Operation - PUT
    router.put('/:id', async (req, res) => {
        try {
            const id = idSchema.parse(req.params.id);
            const data = entitySchema.partial().parse(req.body);
            // Find the item by id
            const entity = await GenericCRUDOperations.getOne(id);
            if (!entity) {
                return res.status(404).json({ error: 'Item not found' });
            }
            const updateEntity = await GenericCRUDOperations.updateOne(id, data);
            res.json(updateEntity);
        }
        catch (error) {
            console.log({ error });
            res.status(400).json({ error: error instanceof zod_1.z.ZodError ? error.errors[0].message : 'Invalid request body' });
        }
    });
    // Delete Operation - DELETE
    router.delete('/:id', async (req, res) => {
        try {
            const id = idSchema.parse(req.params.id);
            // Filter out the item to be deleted
            const deletedEntity = await GenericCRUDOperations.deleteOne(id);
            res.sendStatus(204);
        }
        catch (error) {
            res.status(400).json({ error: 'Invalid item ID' });
        }
    });
    return router;
};
exports.getGenericCRUDRouter = getGenericCRUDRouter;
