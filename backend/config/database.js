const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_STRING)
        console.log(`MongoDB Connected, your database is accessible`)
    } catch (error) {
        console.log('Failed to connect')
}
}

module.exports = connectDB