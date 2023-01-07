import React, { useEffect, useState } from 'react'

const LastBooking = (props) => {
    const { bookingDetails } = props

    return (
        <>
            <div className="last-order">
            <h4>Last Booking Details</h4>
                {bookingDetails.movie && (
                    <div>
                        
                        <b>seats</b>
                        <p>A1 : {bookingDetails.seat.A1}</p>
                        <p>A2 : {bookingDetails.seat.A2}</p>
                        <p>A3 : {bookingDetails.seat.A3}</p>
                        <p>A4 : {bookingDetails.seat.A4}</p>
                        <p>D1 : {bookingDetails.seat.D1}</p>
                        <p>D2 : {bookingDetails.seat.D2}</p>
                        <p><b>slot</b>: {bookingDetails.slot}</p>
                        <p>movie: {bookingDetails.movie}</p>
                    </div>)}
                {!bookingDetails.movie && <p>no previous booking found</p>}

            </div>
        </>
    )
}

export default LastBooking