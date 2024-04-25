const mongoose = require('mongoose')

const connect = async()=>{
    await mongoose.connect(`${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`)
}

module.exports = connect