import express, { Router } from 'express'
import profilesHandler from '../route-handlers/profilesHandler.js'

const router: Router = express.Router()

/**
 * Route that retrieves match stats related to a specific player identified by their player name
 * and player tag, these stats are limited to ones stored on the henrikDev API server
 */
router.get('/:name', profilesHandler)

export default router
