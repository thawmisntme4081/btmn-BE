import { STATUS_CODE } from '../constants.js'
import { partnerModel } from '../models/partners.js'

export const getPartners = async (req, res) => {
  try {
    const partners = await partnerModel.find()
    if (!partners.length)
      res.status(STATUS_CODE.NOT_FOUND).json({
        data: [],
        status: STATUS_CODE.NOT_FOUND,
        message: 'Partners are not found',
      })
    res.status(STATUS_CODE.OK).json({ data: partners, status: STATUS_CODE.OK })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}

export const addPartner = async (req, res) => {
  const newPartner = req.body
  try {
    if (!newPartner?.name || !newPartner.logo)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing name or logo',
        status: STATUS_CODE.BAD_REQUEST,
      })
    const partner = new partnerModel(newPartner)
    await partner.save()
    await res.status(STATUS_CODE.CREATED).json({
      message: 'A new partner is created',
      status: STATUS_CODE.CREATED,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}

export const deletePartner = async (req, res) => {
  const { id } = req.params
  try {
    if (!id)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing ID',
        status: STATUS_CODE.BAD_REQUEST,
      })
    await partnerModel.deleteOne({ _id: id })
    await res.status(STATUS_CODE.OK).json({
      message: `Deleted partner ${id}`,
      status: STATUS_CODE.OK,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}

export const updatePartner = async (req, res) => {
  const { id } = req.params
  const { name, logo } = req.body
  try {
    if (!id)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing ID',
        status: STATUS_CODE.BAD_REQUEST,
      })
    if (!name || !logo)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing name or logo',
        status: STATUS_CODE.BAD_REQUEST,
      })
    await partnerModel.findOneAndUpdate({ _id: id }, {}, { new: true })
    await res.status(STATUS_CODE.OK).json({
      message: `Updated partner ${id}`,
      status: STATUS_CODE.OK,
    })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}
