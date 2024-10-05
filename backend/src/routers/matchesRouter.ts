import express, { Router } from 'express'
import matchesHandler from '../route-handlers/matchesHandler.js'

const router: Router = express.Router()

/**
 * Route for getting match stats from a match_id
 */
router.get('/:match_id', matchesHandler)

export default router
