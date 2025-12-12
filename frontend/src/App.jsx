import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Cars from "./pages/Cars.jsx";
import Contact from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import MyBookings from "./pages/MyBookings.jsx";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-brand-light font-sans text-slate-900">
      <Navbar />
      <main className="flex-1 w-full relative">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
