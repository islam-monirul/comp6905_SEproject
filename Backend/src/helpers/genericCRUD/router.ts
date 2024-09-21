import express, { Request, Response } from 'express';
import { z } from 'zod';
import { MyError } from '../error/error';
import { asyncHandler } from '../asyncHandler/asyncHandler';

const idSchema = z.string().regex(/^[0-9a-fA-F]{24}$/);

export const getGenericCRUDRouter = (GenericCRUDOperations: any, entitySchema: any) => {
    const router = express.Router();

    // Create Operation - POST
    router.post('/', asyncHandler(async (req: Request, res: Response) => {
        const data = entitySchema.parse(req.body);
        const entity = await GenericCRUDOperations.create(data)
        return entity
    }));

    // Read All Operation - GET
    router.get('/', async (req: Request, res: Response) => {
        const entities = await GenericCRUDOperations.getMany();
        res.json(entities);
    });

    // Read Single Operation - GET
    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const id = idSchema.parse(req.params.id);
            const entity = await GenericCRUDOperations.getOne(id)

            if (!entity) {
                return MyError(404, "entity not found")
            }

            res.json(entity);
        } catch (error) {
            res.status(400).json({ error: 'Invalid item ID' });
        }
    });

    // Update Operation - PUT
    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const id = idSchema.parse(req.params.id);
            const data = entitySchema.partial().parse(req.body);

            // Find the item by id
            const entity = await GenericCRUDOperations.getOne(id)

            if (!entity) {
                return res.status(404).json({ error: 'Item not found' });
            }

            const updateEntity = await GenericCRUDOperations.updateOne(id, data)
            res.json(updateEntity);
        } catch (error) {
            console.log({ error });
            res.status(400).json({ error: error instanceof z.ZodError ? error.errors[0].message : 'Invalid request body' });
        }
    });

    // Delete Operation - DELETE
    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            const id = idSchema.parse(req.params.id);

            // Filter out the item to be deleted
            const deletedEntity = await GenericCRUDOperations.deleteOne(id)

            res.sendStatus(204);
        } catch (error) {
            res.status(400).json({ error: 'Invalid item ID' });
        }
    });


    return router
}
