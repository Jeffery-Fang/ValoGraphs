import express, { Router } from 'express'
import playersHandler from '../route-handlers/playersHandler.js'

const router: Router = express.Router()

/**
 * Route that retrieves match stats related to a specific player identified by their player name
 * and player tag
 */
router.get('/:name', playersHandler)

export default router
