import { getGenericCRUDRouter } from '../../../helpers/genericCRUD/router';
import { restaurantService } from './restaurant.service';
import { restaurantSchema } from './restaurant.validation';

// THIS IS NOT COMPLETED YET, AND IS NOT IN USE
// TODO: add types so you don't pass 'any' as a parameter

const CRUDOperations = {
    create: restaurantService.create,
    getMany: restaurantService.getMany,
    getOne: restaurantService.getOne,
    updateOne: restaurantService.updateOne,
    deleteOne: restaurantService.deleteOne,
}

const router = getGenericCRUDRouter(CRUDOperations, restaurantSchema);

// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }) })

//
export default router

