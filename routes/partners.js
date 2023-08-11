import express from 'express'
import {
  addPartner,
  deletePartner,
  getPartners,
  getPartnersMainAndPlatinum,
  updatePartner,
} from '../controllers/partners.js'

const router = express.Router()

router.get('/', getPartners)
router.get('/getPartnersMainAndPlatinum/', getPartnersMainAndPlatinum)
router.post('/', addPartner)
router.put('/:id', updatePartner)
router.delete('/:id', deletePartner)

export default router
