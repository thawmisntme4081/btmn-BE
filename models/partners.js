import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    logo: {
      type: String,
      require: true,
    },
    link: {
      type: String,
    },
    isPrimary: {
      type: Boolean,
    },
  },
  { timestamps: true },
)
export const partnerModel = mongoose.model('Partner', partnerSchema)
