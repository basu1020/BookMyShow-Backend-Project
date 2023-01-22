const express = require("express");
const { body } = require('express-validator'); //importing to validate requests
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors');
app.use(cors())

app.post('/api/booking', async (req, res) => {
    try {
       
        bookingDetails = await connection.create({   // creating new booking details.
            movie : req.body.movie,
            slot: req.body.slot,
            seats: req.body.seats
        })
        res.status(200).json({bookingDetails})

    } catch (error) {
        console.error(error)
        res.status(400).json({error: error.array()})
    }
})

app.get('/api/booking', async (req, res) => {
    
    // fetching last booking or returning message if there isn't any.
    const bookings = await connection.findOne().sort({}).limit(1) //this method is fetching last item from database.
    if (bookings) {
        res.json({lastBooking}) 
    }
    else {
        res.json({message: "no previous booking found"})
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
    console.log(app.routes)
});

module.exports = app;   