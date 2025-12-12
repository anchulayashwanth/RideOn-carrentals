import { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaCar, FaHeadset, FaShieldAlt } from "react-icons/fa";
import heroBgCar from "../assets/hero-bg-car.jpg";

export default function Home() {
  useEffect(() => {
    document.title = "RideOn | Premium Car Rental";
  }, []);

  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <HeroSection />

      {/* Bento Grid Features Section */}
      <section id="why-rideon" className="container mx-auto mt-20 mb-0 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 text-white">
            Unmatched <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-accent">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Large Card 1 - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col justify-between hover:bg-white/10 hover:border-brand-purple/30 transition-all duration-500 group relative overflow-hidden min-h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-purple/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <FaCar className="text-3xl text-brand-purple" />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-display text-white">Premium Fleet</h3>
              <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
                Experience the thrill of our exclusive luxury collection. From high-performance sports cars to commanding SUVs, every vehicle is meticulously maintained for your ultimate comfort and style.
              </p>
            </div>
            <div className="mt-8 h-48 rounded-2xl bg-gradient-to-br from-brand-purple/20 to-transparent overflow-hidden relative shadow-inner">
              <img src={heroBgCar} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Fleet" />
            </div>
          </motion.div>

          {/* Right Column Container - Flex Col for Stacking */}
          <div className="md:col-span-2 flex flex-col gap-6 h-full">

            {/* Medium Card 2 - Top Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex-1 bg-brand-purple/5 border border-brand-purple/20 rounded-3xl p-8 flex items-center gap-6 hover:bg-brand-purple/10 hover:border-brand-purple/40 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-purple flex items-center justify-center shrink-0 shadow-lg shadow-brand-purple/20 group-hover:shadow-brand-purple/40 transition-shadow">
                <FaMoneyBillWave className="text-2xl text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 font-display text-white">Transparent Pricing</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Zero hidden costs. Just clear, competitive rates with dedicated 24/7 support included in every journey.</p>
              </div>
            </motion.div>

            {/* Medium Card 3 - Bottom Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex-1 bg-gradient-to-br from-brand-purple to-brand-accent rounded-3xl p-8 text-white relative overflow-hidden group hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500 min-h-[240px]"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-white/20 transition-colors duration-500"></div>
              <div className="relative z-10 h-full flex flex-col justify-center">
                <FaShieldAlt className="text-5xl mb-6 relative z-10 drop-shadow-md" />
                <h3 className="text-2xl font-bold mb-3 relative z-10 font-display">Secure & Safe</h3>
                <p className="text-white/90 text-lg relative z-10 font-light">Your safety is our priority. Every ride is fully insured and monitored for your complete peace of mind.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
