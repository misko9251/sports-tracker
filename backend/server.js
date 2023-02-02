const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/database')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const session = require('express-session')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config({path: './config/.env'})
require("./config/passport")(passport);


connectDB()

// Middleware
app.use(express.urlencoded({limit: '50mb', extended: true }));    // use express to parse the form data
app.use(express.json({limit: '50mb'}));    // use express to parse json data
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Store sessions as cookies
app.use(
    session({
        secret: 'keyboardcat', // set the secret key for the session
        resave: false,  // don't save session if unmodified
        saveUninitialized: false,   // don't create session until something stored
        store: MongoStore.create({mongoUrl:process.env.MONGO_STRING})
    }))

// Set passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/auth', authRoutes)

app.listen(process.env.PORT, (req, res)=> {
    console.log(`Server is running on port ${process.env.PORT}`)
})