import React, { useEffect, useState } from 'react'
import { movies, slots, seats } from "../data"; //importing info provided from data.js
import LastBooking from './LastBooking';

const Booking = () => {
    const defaultSeatCount = { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0" } // default seat count
    const [curMovie, setCurMovie] = useState(localStorage.getItem('current-movie')) //current selected movie
    const [curSlot, setCurSlot] = useState(localStorage.getItem('current-slot'))    //current selected time slot
    const [curSeat, setCurSeat] = useState(localStorage.getItem('current-seat'))    //current selected seat 
    const [curSeatCount, setCurSeatCount] = useState({})
    const [bookingDetails, setBookingDetails] = useState({ movie: null, slot: null, seat: { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0" } })

    const fetchLastBooking = async () => {  // fetches the last booking and updates booking details
        let response = await fetch('http://localhost:8080/api/booking')
        let data = await response.json()
        setBookingDetails(data.lastBooking)
    }

    useEffect(() => {
        fetchLastBooking()  //fetching the last booking

        if (!localStorage.getItem('seats')) {  //setting the seats in local storage if its not there and setting the 'curSeatCount' state if its there. 
            localStorage.setItem('seats', JSON.stringify(defaultSeatCount))
        }
        else {
            setCurSeatCount(JSON.parse(localStorage.getItem('seats')))
        }
    }, [])

    const onChangeNoOfSeat = (e) => {    // updating 'curSeatCount' and adding it in local storage on change of seat no.
        setCurSeatCount({ ...curSeatCount, [e.target.name]: e.target.value })
        localStorage.setItem('seats', JSON.stringify({ ...curSeatCount, [e.target.name]: e.target.value }))
    }

    const onClickBookNow = async () => {  // actions taken on clicking 'Book Now' button. 

        const res = await fetch('http://localhost:8080/api/booking', {  //POSTing on the api :)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: curMovie, slot: curSlot, seats: curSeatCount })
        })

        if (res.status === 200) {  //setting the Last booking details and clearing data from localStorage and updating states on successful booking.
            setBookingDetails({
                movie: curMovie,
                slot: curSlot,
                seats: curSeatCount
            })
            localStorage.removeItem('current-movie')
            localStorage.removeItem('current-slot')
            localStorage.removeItem('current-seat')
            localStorage.setItem('seats', JSON.stringify(defaultSeatCount))
            setCurMovie('')
            setCurSeat('')
            setCurSlot('')
            setCurSeatCount(defaultSeatCount)
        }
    }

    return (
        <>
            <div>
                <h3>Book Your Show Now !!</h3>
                <div className="d-flex">
                    <div className='m-2'>
                        <div className="movie-row">
                            <h4>Select a Movie</h4>
                            {movies.map(element => {
                                return (
                                    <div
                                        key={element}
                                        className={curMovie === element ? 'movie-column movie-column-selected' : 'movie-column'}
                                        onClick={() => {
                                            localStorage.setItem('current-movie', element)
                                            setCurMovie(element)
                                        }}>
                                        {element}
                                    </div>)
                            })}
                        </div>
                        <div className="slot-row">
                            <h4>Select a Time Slot</h4>
                            {slots.map(element => {
                                return (
                                    <div
                                        key={element}
                                        value={element}
                                        className={curSlot === element ? 'slot-column slot-column-selected' : 'slot-column'}
                                        onClick={() => {
                                            localStorage.setItem('current-slot', element)
                                            setCurSlot(element)
                                        }}
                                    >
                                        {element}
                                    </div>)
                            })}
                        </div>
                        <div className="seat-row">
                            <h4>Select the Seats</h4>
                            {seats.map(element => {
                                return (
                                    <div
                                        key={element}
                                        className={curSeat === element ? 'seat-column  seat-column-selected' : 'seat-column'}
                                        onClick={() => {
                                            setCurSeat(element)
                                            localStorage.setItem('current-seat', element)
                                        }}>
                                        Type {element}

                                        <input
                                            type="number"
                                            name={element}
                                            value={curSeatCount ? curSeatCount[element] : "0"}
                                            min={'0'}
                                            id={`seat-${element}`}
                                            onChange={onChangeNoOfSeat}
                                        />
                                    </div>)
                            })}
                        </div>
                        <div className="book-button">
                            <button disabled={!curMovie || !curSlot || !Object.values(curSeatCount).some(value => Number(value))} // disabling button if no movie, no slot and none of the seat types have either 1 seat selected.  
                                onClick={onClickBookNow}>
                                Book Now
                            </button>
                        </div>

                    </div>
                    {/* LastBooking component receives booking details */}
                    <LastBooking bookingDetails={bookingDetails} />
                </div>
            </div>
        </>
    )
}

export default Booking