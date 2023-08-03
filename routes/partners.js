import express from 'express'
import {
  addPartner,
  deletePartner,
  getPartners,
} from '../controllers/partners.js'

const router = express.Router()

router.get('/', getPartners)
router.post('/', addPartner)
router.delete('/:id', deletePartner)

export default router
