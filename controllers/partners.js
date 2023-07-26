import { partnerModel } from '../models/partner.js'

export const getPartners = async (req, res) => {
  try {
    const partners = await partnerModel.find()
    res.status(200).json(partners)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const addPartner = async (req, res) => {
  try {
    const newPartner = req.body

    const partner = new partnerModel(newPartner)
    await partner.save()

    res.status(200).json(partner)
  } catch (error) {
    res.status(500).json({ error })
  }
}
