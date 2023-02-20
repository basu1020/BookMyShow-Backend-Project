require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { connection } = require("./connector");
const cors = require('cors');
app.use(cors())

// creating new booking details.
app.post('/api/booking', async (req, res) => {
    try {
        bookingDetails = await connection.create({
            movie: req.body.movie,
            slot: req.body.slot,
            seats: req.body.seats
        })
        res.status(200).json({ bookingDetails })

    } catch (error) {
        console.error(error, "idhar hua error")
        res.status(400).json({ error: error.array() })
    }
})

// fetching last booking and returning message if there isn't any.
app.get('/api/booking', async (req, res) => {

    try {
        //this method is fetching last item from database.
        const lastBooking = await connection.findOne({}).sort({ _id: -1 }).exec()
        if (lastBooking) {
            res.status(200).json(lastBooking)
        }
        else {
            res.status(200).json({ message: "no previous booking found" })
        }
    } catch (error) {
        res.status(400).json({ error: "Bad request detected" })
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
});

module.exports = app;   