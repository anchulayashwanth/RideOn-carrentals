import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("📝 Signup data:", { name, email, password });

    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      alert("✅ Signup successful!");
      // console.log("Response:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass-card w-full max-w-md p-8 rounded-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join RideOn today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-brand-purple transition-all shadow-lg shadow-brand-dark/20 hover:shadow-brand-purple/30 disabled:opacity-70 mt-2"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-brand-purple cursor-pointer font-bold hover:underline"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}
