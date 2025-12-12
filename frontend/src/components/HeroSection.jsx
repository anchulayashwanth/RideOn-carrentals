import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark px-6">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark z-10"></div>
        {/* Moving Car Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          poster="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920"
        >
          {/* Stable Github Raw Link for a Driving Video */}
          <source src="https://videos.pexels.com/video-files/5956041/5956041-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-6 tracking-wide shadow-lg">
            PREMIUM CAR RENTAL
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight tracking-tighter mb-8 drop-shadow-2xl">
            Drive the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-white to-brand-purple bg-[length:200%_auto] animate-gradient">
              Extraordinary.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-lg font-medium">
            Experience the thrill of the open road with our curated fleet of world-class vehicles.
            Where luxury meets performance.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
        >
          <Link to="/cars">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-brand-purple/90 backdrop-blur-lg font-display rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple ring-offset-brand-dark overflow-hidden hover:bg-brand-purple border border-white/20">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                Book Your Ride
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Floating Elements (Decorative - reduced for video clarity) */}
      <motion.div
        className="absolute bottom-10 right-10 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl mix-blend-overlay"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </section>
  );
}
