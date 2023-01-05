import React, { useEffect, useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css'
import { movies, slots, seats } from "./data";

const App = () => {

  const [moviesList, setmoviesList] = useState(movies)
  const [slotsList, setSlotsList] = useState(slots)
  const [seatsList, setSeatsList] = useState(seats)

  const onClickBookNow = () => {
      
  }

  // write your code here
  return (<>
    <div className="container rounded border">
      <h2>Book Your Show Now !!</h2>
      <div className="movie-row">
        <h3>Select a Movie</h3>
        {moviesList.map(element => {
          return <div key={element} className="movie-column">{element}</div>
        })}
      </div>
      <div className="slot-row">
        <h3>Select a Time Slot</h3>
        {slotsList.map(element => {
          return <div key={element} className="slot-column">{element}
          </div>
        })}
      </div>
      <div className="seat-row">
        <h3>Select the Seats</h3>
        {seatsList.map(element => {
          return <div className="seat-column" onClick={() => { console.log(element) }}>
            Type {element}
            <input type="number" />
          </div>
        })}
      </div>
      <div className="book-button">
        <button>Book Now</button>
      </div>
      <div className="last-order">
      </div>
    </div>
  </>);
}


export default App;
