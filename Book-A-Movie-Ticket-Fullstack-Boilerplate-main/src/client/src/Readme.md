# Frontend Logic Overview

This directory consists of the frontend logic source. 

- **components** folder consists of the JS compnents 
- **styles** folder consists of the css files used for designing. 
- `data.js` consists of data regarding the movie names, time slots and seat names for booking.

## Overview of the /components folder 

`/components` folder has three JS files - `App.js`, `Booking.js` and `LastBooking.js`
- `Booking.js` has all the functionality of booking new movie, storing data in localhost and getting the last movie booked from the API.  
- whereas  `LastBooking.js` is the child component where the "last booked movie" details is displayed which is recieved as **props**. 
- Lastly, `Booking.js` is imported in `App.js`.  
 
