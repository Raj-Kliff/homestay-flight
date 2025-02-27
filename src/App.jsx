import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Payment from "./pages/Payment"
import BookingSuccess from "./pages/BookingSuccess"
import BookingFailure from "./pages/BookingFailure"
import BookingAdons from "./pages/BookingAdons"
import Login from "./pages/Login"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking/:id' element={<Booking />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/booking-success' element={<BookingSuccess />} />
          <Route path='/booking-failure' element={<BookingFailure />} />
          <Route path='/booking-adons' element={<BookingAdons />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
