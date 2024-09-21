import { getGenericCRUDRouter } from '../../../helpers/genericCRUD/router';
import { slopeService } from './slope.service';
import { slopeSchema } from './slope.validation';

const router = getGenericCRUDRouter(slopeService, slopeSchema);

// add any additional routes
router.get('/test/test', (req, res) => { res.json({ data: "this is a custom route" }) })

//
export default router