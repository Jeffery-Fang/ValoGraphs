import express, { Router } from 'express'
import matchesHandler from '../route_handlers/matches_handler.js'

const router: Router = express.Router()

/**
 * Route for getting match stats from a match_id
 */
router.get('/:match_id', matchesHandler)

export default router
