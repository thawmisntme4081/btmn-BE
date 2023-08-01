import mongoose from 'mongoose'

const connect = (cb) => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(cb)
    .catch((err) => {
      console.log(err)
    })
}

export default connect
