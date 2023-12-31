import { STATUS_CODE } from '../constants.js'
import { invalidValue } from '../helpers.js'
import { Partner } from '../models/partners.js'
import { TypePartner } from '../models/typePartner.js'

export const getPartners = async (req, res) => {
  try {
    const partners = await Partner.find().populate('type').exec()
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

export const getPartnersMainAndPlatinum = async (req, res) => {
  try {
    const typeMainAndPlatinum = await TypePartner.find({
      $or: [{ value: 'main' }, { value: 'platinum' }],
    }).select('_id')

    if (!typeMainAndPlatinum.length)
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: STATUS_CODE.NOT_FOUND,
        message: 'Type partners are not found',
      })

    const [typeMain, typePlatinum] = typeMainAndPlatinum

    const partnersMainAndPlatinum = await Partner.find(
      {
        $or: [{ type: typeMain._id }, { type: typePlatinum._id }],
      },
      { name: 1, logo: 1, link: 1 },
    )
      .populate('type')
      .exec()

    if (!partnersMainAndPlatinum.length)
      res.status(STATUS_CODE.NOT_FOUND).json({
        data: [],
        status: STATUS_CODE.NOT_FOUND,
        message: 'Partners are not found',
      })

    const main = partnersMainAndPlatinum.filter(
      (partner) => partner.type.value === 'main',
    )

    const platinum = partnersMainAndPlatinum.filter(
      (partner) => partner.type.value === 'platinum',
    )

    res.status(STATUS_CODE.OK).json({ main, platinum, status: STATUS_CODE.OK })
  } catch (error) {
    res
      .status(STATUS_CODE.INTERNAL_SERVER_ERROR)
      .json({ error, status: STATUS_CODE.INTERNAL_SERVER_ERROR })
  }
}

export const addPartner = async (req, res) => {
  const newPartner = req.body
  try {
    if (!newPartner?.name || !newPartner?.logo || !newPartner?.primaryLogo)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing name or logo',
        status: STATUS_CODE.BAD_REQUEST,
      })
    const partner = new Partner(newPartner)
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
    await Partner.deleteOne({ _id: id })
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
  const isBlankNameOrLogo =
    (req.body?.hasOwnProperty('name') && invalidValue(req.body.name)) ||
    (req.body?.hasOwnProperty('primaryLogo') &&
      invalidValue(req.body.primaryLogo)) ||
    (req.body?.hasOwnProperty('logo') && invalidValue(req.body.logo))
  try {
    if (!id)
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing ID',
        status: STATUS_CODE.BAD_REQUEST,
      })
    if (isBlankNameOrLogo) {
      res.status(STATUS_CODE.BAD_REQUEST).json({
        message: 'Missing name or logo',
        status: STATUS_CODE.BAD_REQUEST,
      })
    }
    await Partner.findOneAndUpdate({ _id: id }, req.body, { new: true })
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
