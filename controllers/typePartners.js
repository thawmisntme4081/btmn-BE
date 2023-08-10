import { STATUS_CODE } from '../constants.js'
import { TypePartner } from '../models/typePartner.js'

export const getTypePartners = async (req, res) => {
  try {
    const typePartners = await TypePartner.find()
    if (!typePartners.length)
      res.status(STATUS_CODE.NOT_FOUND).json({
        data: [],
        status: STATUS_CODE.NOT_FOUND,
        message: 'Type partners are not found',
      })
    res
      .status(STATUS_CODE.OK)
      .json({ data: typePartners, status: STATUS_CODE.OK })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}
