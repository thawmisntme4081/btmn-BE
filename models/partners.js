import { Schema, model } from 'mongoose'

const partnerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    primaryLogo: {
      type: String,
      required: [true, 'Primary logo is required'],
    },
    logo: {
      type: String,
      required: [true, 'Logo is required'],
    },
    link: {
      type: String,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'TypePartner',
      required: true,
    },
  },
  { timestamps: true },
)
export const Partner = model('Partner', partnerSchema)
