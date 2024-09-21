import cors from 'cors'
import express from 'express';
import path from 'path'
import logger from 'morgan';
import restaurantRouter from '../../entities/Nodes/restaurant/restaurant.controller';
import mapRouter from '../../entities/map/controller';
import bathroomRouter from '../../entities/Nodes/bathroom/bathroom.controller';
import liftStationRouter from '../../entities/Nodes/liftStation/liftStation.controller';
import slopeRouter from '../../entities/Edges/slope/slope.controller';
import skiLiftRouter from '../../entities/Edges/skiLift/skiLift.controller';
import slopeEndRouter from '../../entities/Nodes/slopeEnd/slopeEnd.controller';
import slopeStartRouter from '../../entities/Nodes/slopeStart/slopeStart.controller';
import { configs } from '../configs';
import { restApiRouter } from '../auth/api.router';
import { errors } from '../error/errorHandler.middlerware';

// =========================================================
export async function launchWebServer() {
    const app = express();

    // cors config
    app.use(cors())

    // morgan logger
    app.use(logger('dev'))

    // parse JSON request body
    app.use(express.json())

    // parse `x-www-form-urlencoded` POST request bodies
    app.use(express.urlencoded({ extended: true }))

    // upload static file path
    app.use(express.static(path.join(__dirname, 'public')))

    // passport auth
    // app.use(passportAuthenticate())

    app.use('/map', mapRouter)

    app.use(restApiRouter)

    app.use('/node/restaurant', restaurantRouter)
    app.use('/node/bathroom', bathroomRouter)
    app.use('/node/liftStation', liftStationRouter)


    app.use('/node/slopeStart', slopeStartRouter)
    app.use('/node/slopeEnd', slopeEndRouter)

    app.use('/edge/slope', slopeRouter)
    app.use('/edge/skiLift', skiLiftRouter)


    // Error Handling
    app.use(errors)


    // Error Handling
    // app.use(errors)

    // Server listening
    const PORT: string = configs.PORT
    app.listen(PORT, () => {
        console.dir(`server is listening on port ${PORT}...`)
    })

    return app
}
// =========================================================