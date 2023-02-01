const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/database')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config({path: './config/.env'})

connectDB()

// Middleware
app.use(express.urlencoded({limit: '50mb', extended: true }));    // use express to parse the form data
app.use(express.json({limit: '50mb'}));    // use express to parse json data
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Routes
app.use('/auth', authRoutes)

app.listen(process.env.PORT, (req, res)=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})