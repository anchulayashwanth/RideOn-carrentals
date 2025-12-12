import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGasPump, FaCogs, FaChair, FaTimes, FaCarSide } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";


export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Reactive User State
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    // Handler to update user state from localStorage
    const handleAuthChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    // Listen for custom event and storage event (cross-tab)
    window.addEventListener("authChange", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange")); // Notify change
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cars", path: "/cars" },
    { name: "Contact", path: "/contact" },
  ];

  if (user) {
    navLinks.push({ name: "My Bookings", path: "/my-bookings" });
  }

  return (
    <nav className="glass-nav">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-2xl font-bold cursor-pointer font-display text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-accent scale-100 hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            RideOn
          </h1>
        </motion.div>

        {/* Desktop Links */}
        {/* Moving Car Animation */}
        <div className="hidden md:block flex-1 mx-12 relative h-10 overflow-hidden">
          <motion.div
            initial={{ left: "0%" }}
            animate={{
              left: ["0%", "75%", "0%"],
              scaleX: [1, 1, -1, -1, 1],
              color: ["#6B46C1", "#E53E3E", "#6B46C1"]
            }}
            transition={{
              duration: 8,
              ease: "linear",
              repeat: Infinity,
              times: [0, 0.45, 0.5, 0.95, 1]
            }}
            className="absolute top-1/2 -translate-y-1/2 text-2xl"
          >
            <FaCarSide />
          </motion.div>
        </div>

        {/* Desktop Navigation & Auth */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative font-medium transition-colors hover:text-brand-purple ${location.pathname === link.path ? "text-brand-purple" : "text-gray-600"
                }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-full h-[2px] w-full bg-brand-purple"
                />
              )}
            </Link>
          ))}

          {/* Auth Button */}
          {!user ? (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-purple text-white px-5 py-2 rounded-full shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-all font-medium"
              >
                Login
              </motion.button>
            </Link>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-500/10 text-red-600 border border-red-500/20 px-5 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all font-medium"
            >
              Logout
            </motion.button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 text-2xl">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>


      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 font-medium hover:text-brand-purple"
                >
                  {link.name}
                </Link>
              ))}
              {!user ? (
                <div className="flex flex-col gap-3 w-3/4">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-2 bg-brand-purple text-white rounded-lg">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-500 font-medium"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
}
