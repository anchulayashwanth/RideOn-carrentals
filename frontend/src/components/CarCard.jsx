import api from "../api/api.js"; // Use your Axios instance
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGasPump, FaCogs, FaChair, FaTimes } from "react-icons/fa";

export default function CarCard({ car }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate Price when dates change
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setTotalPrice(diffDays > 0 ? diffDays * car.daily_rate_inr : 0);
    }
  }, [startDate, endDate, car.daily_rate_inr]);

  const handleBookClick = () => {
    if (!user || !token) {
      alert("Please login first to book a car.");
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = async () => {
    if (!startDate || !endDate) return alert("Please select both start and end dates.");
    if (totalPrice <= 0) return alert("Invalid duration.");

    const bookingData = {
      carId: car._id,
      carName: `${car.make} ${car.model}`,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalPrice,
    };

    try {
      const res = await api.post("/api/bookings", bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Booking successful!");
      console.log("✅ Booking saved:", res.data);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Booking error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "❌ Booking failed.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group"
      >
        <div className="relative overflow-hidden h-56">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1000";
              e.target.onerror = null;
            }}
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-brand-dark shadow-sm">
            ₹{car.daily_rate_inr}/day
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-brand-purple text-sm font-medium uppercase tracking-wider">{car.make}</p>
              <h3 className="text-lg font-bold text-gray-900">{car.model}</h3>
              <span className="text-xs text-gray-500">{car.type}</span>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded font-medium ${
                car.availability_status === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {car.availability_status}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 my-4 border-t border-b border-gray-100 py-3">
            <div className="flex flex-col items-center text-center gap-1">
              <FaGasPump className="text-gray-400" />
              <span className="text-xs text-gray-500">{car.fuel_type}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1 border-l border-gray-100">
              <FaCogs className="text-gray-400" />
              <span className="text-xs text-gray-500">Auto</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1 border-l border-gray-100">
              <FaChair className="text-gray-400" />
              <span className="text-xs text-gray-500">{car.seating_capacity} Seats</span>
            </div>
          </div>

          <button
            onClick={handleBookClick}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-semibold hover:bg-brand-purple transition-colors shadow-lg shadow-brand-dark/20 hover:shadow-brand-purple/30"
          >
            Book Now
          </button>
        </div>
      </motion.div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-1">Confirm Booking</h3>
            <p className="text-gray-500 mb-6">{car.make} {car.model}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center mt-4">
                <span className="text-gray-600 font-medium">Total Price</span>
                <span className="text-2xl font-bold text-brand-purple">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                onClick={confirmBooking}
                className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-purple transition-all shadow-lg hover:shadow-brand-purple/30 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!startDate || !endDate || totalPrice <= 0}
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
