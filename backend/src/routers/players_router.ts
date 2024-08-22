import express, { Router } from 'express'
import playersHandler from '../route_handlers/players_handler.js'

const router: Router = express.Router()

/**
 * Route that retrieves match stats related to a specific player identified by their player name
 * and player tag
 */
router.get('/:name', playersHandler)

export default router
