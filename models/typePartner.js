import { Schema, model } from 'mongoose'

const typePartnerSchema = new Schema(
  {
    value: {
      type: String,
      required: [true, 'Value is required'],
    },
    label: {
      type: String,
      required: [true, 'Label is required'],
    },
  },
  { timestamps: true },
)
export const TypePartner = model('TypePartner', typePartnerSchema)
