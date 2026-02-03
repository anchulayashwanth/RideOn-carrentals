import { useState } from "react";
import api from "../api/api.js";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      // Use shared axios instance with baseURL from VITE_API_URL
      await api.post("/api/contact", form);
      alert("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("❌ Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-brand-light px-4 py-20"
    >
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

        {/* Contact Info Side */}
        <div className="bg-brand-dark p-10 text-white md:w-1/3 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-display font-bold mb-4">Get in Touch</h3>
            <p className="text-gray-400 mb-8">We'd love to hear from you. Fill out the form or reach us via email.</p>
          </div>
          <div className="space-y-4 text-sm text-gray-300">
            <p>support@rideon.com</p>
            <p>+91 7995258656</p>
            <p>vijaywada,india</p>
          </div>

          <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-white/10">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122396.9030635959!2d80.56942767069153!3d16.510887132039203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eff9482d944b%3A0x939b7e8d6d3d0bebe!2sVijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 md:w-2/3">
          <motion.form
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-purple text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-purple/90 transition shadow-lg shadow-brand-purple/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <FaPaperPlane className="text-sm" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
