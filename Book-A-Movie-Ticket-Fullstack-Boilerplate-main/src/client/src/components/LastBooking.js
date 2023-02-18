import React, { useEffect, useState } from 'react'

const LastBooking = (props) => {  //receives props about booking details from <Booking> component
    const { bookingDetails } = props

    return (
        <>
            <div className="last-order">
            <h4>Last Booking Details</h4>
                {bookingDetails.movie && (
                    <div>
                        <b>seats</b>
                        <p>A1 : {bookingDetails.seats.A1}</p>
                        <p>A2 : {bookingDetails.seats.A2}</p>
                        <p>A3 : {bookingDetails.seats.A3}</p>
                        <p>A4 : {bookingDetails.seats.A4}</p>
                        <p>D1 : {bookingDetails.seats.D1}</p>
                        <p>D2 : {bookingDetails.seats.D2}</p>
                        <p><b>slot</b>: {bookingDetails.slot}</p>
                        <p>movie: {bookingDetails.movie}</p>
                    </div>)}
                {!bookingDetails.movie && <p>no previous booking found</p>} 
            </div>
        </>
    )
}

export default LastBooking