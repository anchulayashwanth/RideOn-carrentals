import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!user || !token) {
            setError("Please login to view your bookings.");
            setLoading(false);
            return;
        }

        const fetchBookings = async () => {
            try {
                const res = await axios.get("/api/bookings/my-bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(res.data);
            } catch (err) {
                console.error("❌ Error fetching bookings:", err);
                setError("Failed to load your bookings.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user, token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-brand-light">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-light pt-24 pb-12 px-6">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h2 className="text-3xl font-display font-bold text-brand-dark">My Bookings</h2>
                    <p className="text-gray-500">Track and manage your car rentals</p>
                </motion.div>

                {error ? (
                    <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
                        <p className="text-red-500 font-bold mb-4">{error}</p>
                        <Link to="/login" className="text-brand-purple hover:underline">Go to Login</Link>
                    </div>
                ) : bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center bg-white p-12 rounded-3xl border border-dashed border-gray-200"
                    >
                        <div className="text-6xl mb-4">📭</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings found</h3>
                        <p className="text-gray-500 mb-6">You haven't booked any trips yet.</p>
                        <Link to="/cars">
                            <button className="bg-brand-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-purple/90 transition shadow-lg shadow-brand-purple/30">
                                Explore Cars
                            </button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -2 }}
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col md:flex-row gap-6 items-center md:items-start"
                            >
                                {/* Car Image */}
                                <div className="w-full md:w-1/3 h-48 rounded-xl overflow-hidden bg-gray-100">
                                    <img
                                        src={booking.carId?.image_url}
                                        alt={booking.carId?.model || "Car"}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&q=80&w=1000"; }}
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 w-full relative">
                                    {/* Status Badge */}
                                    <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Confirmed
                                    </div>

                                    <h3 className="text-2xl font-bold text-brand-dark mb-1">
                                        {booking.carId?.make} {booking.carId?.model}
                                    </h3>
                                    <p className="text-gray-500 mb-4">{booking.carId?.type}</p>

                                    <div className="grid grid-cols-2 gap-4 mb-4 bg-gray-50 p-4 rounded-xl">
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Pick-up</p>
                                            <p className="font-semibold text-gray-800">{new Date(booking.startDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Drop-off</p>
                                            <p className="font-semibold text-gray-800">{new Date(booking.endDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                        <span className="text-sm text-gray-500">Total Price</span>
                                        <span className="text-xl font-bold text-brand-purple">₹{booking.totalPrice}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
