import mongoose from 'mongoose'

const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
    link: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
)
export const partnerModel = mongoose.model('Partner', partnerSchema)
