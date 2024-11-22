const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const registerRoute = require('./Routes/registrationrouters')
const styleRoutes = require('./Routes/tattooStyleRoute')
// const designRoutes = require("./Routes/designRoutes");
const bookingRoutes = require('./Routes/bookingroute')
const tattooStyleRoutes = require('./Routes/tattooStyleRoute');
const artistRoutes = require('./Routes/artistRoute');
// const login = require('./Routes/login')
const cors = require('cors')


const app = express()

const port = 5100

dotenv.config()
app.use(express.json());
app.use(bodyparser.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected")
}).catch((error)=>{
    console.log(`mongodb connection error ${error}`)
})


app.use('/tattooStyles', tattooStyleRoutes); 
app.use('/artists', artistRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Tattoo API!');
});

// app.use('/auth', login);

app.use('/register',registerRoute)

app.use('/Login',registerRoute)

app.use('/style', styleRoutes);

// app.use("/api/designs", designRoutes);

app.use('/bookings', bookingRoutes);

app.listen(port,(req,res)=>{
    console.log("server connected successful")
})

