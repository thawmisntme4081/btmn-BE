import express from 'express'
import { addPartner, getPartners } from '../controllers/partners.js'

const router = express.Router()

router.get('/', getPartners)
router.post('/', addPartner)

export default router
