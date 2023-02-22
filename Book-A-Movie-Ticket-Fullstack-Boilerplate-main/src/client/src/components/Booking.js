import React, { useEffect, useState } from 'react'
import { movies, slots, seats } from "../data"; //importing info provided from data.js
import LastBooking from './LastBooking';

const Booking = () => {

    // default seat count
    const defaultSeatCount = { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0" } 

     // State hooks that store current selected movie, slot, seat, and seat count.
    const [curMovie, setCurMovie] = useState(localStorage.getItem('current-movie')) 
    const [curSlot, setCurSlot] = useState(localStorage.getItem('current-slot'))
    const [curSeat, setCurSeat] = useState(localStorage.getItem('current-seat'))    
    const [curSeatCount, setCurSeatCount] = useState({})

     // State hook that stores the booking details.
    const [bookingDetails, setBookingDetails] = useState({ movie: null, slot: null, seat: { A1: "0", A2: "0", A3: "0", A4: "0", D1: "0", D2: "0" } })

    // This function fetches the last booking and updates booking details.
    const fetchLastBooking = async () => {  
        try {
            const response = await fetch('https://bookmyshow-backend-project-production.up.railway.app/api/booking')
            const data = await response.json()
            if(data){
                console.log(data)
                setBookingDetails(data)
            }
        } catch (error) {
            console.log(error)
            setBookingDetails({ movie: null })
        }
    }

    // This effect hook is responsible for fetching the last booking and setting the seats in local storage
    // if they're not already there. If the seats are already in local storage, then it sets the "curSeatCount" state.
    useEffect(() => {
        fetchLastBooking()  

        //setting the seats in local storage if its not there and setting the 'curSeatCount' state if its there.
        if (!localStorage.getItem('seats')) {   
            localStorage.setItem('seats', JSON.stringify(defaultSeatCount))
        }
        else {
            setCurSeatCount(JSON.parse(localStorage.getItem('seats')))
        }
    }, [])

     // updating 'curSeatCount' and adding it in local storage on change of no of seat
    const onChangeNoOfSeat = (e) => {   
        setCurSeatCount({ ...curSeatCount, [e.target.name]: e.target.value })
        localStorage.setItem('seats', JSON.stringify({ ...curSeatCount, [e.target.name]: e.target.value }))
    }

    // actions taken on clicking 'Book Now' button.
    const onClickBookNow = async () => {   

        const res = await fetch('https://bookmyshow-backend-project-production.up.railway.app/api/booking', {  //POSTing on the api :)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ movie: curMovie, slot: curSlot, seats: curSeatCount })
        })

        //setting the Last booking details, clearing data from localStorage and updating states on successful booking.
        if (res.status === 200) {  
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
                                            defaultValue={curSeatCount ? curSeatCount[element] : "0"}
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