import React, { useEffect, useState } from 'react'
import { movies, slots, seats } from "./data"; //importing info provided from data.js
import LastBooking from './LastBooking';

const Booking = () => {
    const defaultSeatCount = { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0"}
    const [curMovie, setCurMovie] = useState(localStorage.getItem('current-movie'))
    const [curSlot, setCurSlot] = useState(localStorage.getItem('current-slot'))
    const [curSeat, setCurSeat] = useState(localStorage.getItem('current-seat'))
    const [curSeatCount, setCurSeatCount] = useState({})
    const [bookingDetails, setBookingDetails] = useState({movie: null, slot: null, seat: { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0"}})

    const fetchLastBooking = async () => {
        let response = await fetch('http://localhost:8080/api/booking')
        let data = await response.json()
        setBookingDetails(data.lastBooking)
    }

    useEffect(() => {
        //setting the seats in local storage
        fetchLastBooking()
        if (!localStorage.getItem('seats')) {
            localStorage.setItem('seats', JSON.stringify(defaultSeatCount))
        }
        else{
            setCurSeatCount(JSON.parse(localStorage.getItem('seats')))
        }
    }, [])

    const onChangeNoOfSeat = (e) => {
        setCurSeatCount({...curSeatCount, [e.target.name]: e.target.value})
        localStorage.setItem('seats', JSON.stringify({...curSeatCount, [e.target.name]:e.target.value}))
    }

    const onClickBookNow = async () => {
        console.log(JSON.stringify({curMovie, curSlot, curSeatCount}))
        // POSTing on the api
        const res = await fetch('http://localhost:8080/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: curMovie, slot: curSlot, seats: curSeatCount })
        })
        const json = await res.json()
        console.log(json)

        // setting the Last Booking Details
        setBookingDetails({
            movie: curMovie,
            slot: curSlot,
            seats: curSeatCount
        })

        // clearing from localStorage and updating state
        localStorage.removeItem('current-movie')
        localStorage.removeItem('current-slot')
        localStorage.removeItem('current-seat')
        localStorage.setItem('seats', JSON.stringify(defaultSeatCount))
        setCurMovie('')
        setCurSeat('')
        setCurSlot('')
        setCurSeatCount(defaultSeatCount)
    }

    const onClickSlots = (e) => {
        localStorage.setItem('current-slot', e.target.value)
        e.target.classList.add('slot-column-selected')
    }
    return (
        <>
            <div>
                <h3>Book Your Show Now !!</h3>
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
                                value={`${element}`}
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
                    {/* button that will send new ticket details on the backend*/}
                    <button disabled={!curMovie || !curSlot || !Object.values(curSeatCount).some(value => Number(value))} onClick={onClickBookNow}>Book Now</button>
                </div>
                <LastBooking bookingDetails={bookingDetails}/>
            </div>
        </>
    )
}

export default Booking