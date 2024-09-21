import { getGenericCRUDRouter } from '../../../helpers/genericCRUD/router';
import { skiLiftService } from './skiLift.service';
import { skiLiftSchemaSchema } from './skiLift.validation';

// THIS IS NOT COMPLETED YET, AND IS NOT IN USE
// TODO: add types so you don't pass 'any' as a parameter

const router = getGenericCRUDRouter(skiLiftService, skiLiftSchemaSchema);

// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }) })

//
export default router

