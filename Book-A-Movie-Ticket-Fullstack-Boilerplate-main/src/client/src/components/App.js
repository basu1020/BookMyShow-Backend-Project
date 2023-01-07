import React from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css'

import Booking from "./Booking";
import LastBooking from "./LastBooking";

const App = () => {

  // write your code here
  return (<>
    <div className="container rounded border d-flex flex-wrap">
      <Booking/>
    </div>
  </>);
}


export default App;
