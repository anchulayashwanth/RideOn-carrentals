import { useState } from "react";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      // Use shared axios instance with baseURL from VITE_API_URL
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // alert("✅ Login successful!");
      console.log("Response:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Notify other components (Navbar) of auth change
      window.dispatchEvent(new Event("authChange"));

      navigate("/"); // redirect to home
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "❌ Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-purple transition-all shadow-lg shadow-brand-dark/20 hover:shadow-brand-purple/30 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-brand-purple cursor-pointer font-bold hover:underline"
          >
            Sign Up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
