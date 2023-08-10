import express from 'express'
import { getTypePartners } from '../controllers/typePartners.js'

const router = express.Router()

router.get('/', getTypePartners)

export default router
