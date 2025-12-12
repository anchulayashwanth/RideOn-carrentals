import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import CarCard from "../components/CarCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    make: "All",
    type: "All",
    fuel_type: "All",
    priceRange: 50000, // Max price default
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("/api/cars");
        console.log("✅ Cars fetched:", res.data);
        setCars(res.data);
        setFilteredCars(res.data);
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
        setError("Failed to load cars. Please check backend connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = cars;

    if (filters.make !== "All") {
      result = result.filter((car) => car.make === filters.make);
    }
    if (filters.type !== "All") {
      result = result.filter((car) => car.type === filters.type);
    }
    if (filters.fuel_type !== "All") {
      result = result.filter((car) => car.fuel_type === filters.fuel_type);
    }
    result = result.filter((car) => car.daily_rate_inr <= filters.priceRange);

    setFilteredCars(result);
  }, [filters, cars]);

  // Extract Unique Options for Dropdowns
  const makes = useMemo(() => ["All", ...new Set(cars.map((car) => car.make))], [cars]);
  const types = useMemo(() => ["All", ...new Set(cars.map((car) => car.type))], [cars]);
  const fuels = useMemo(() => ["All", ...new Set(cars.map((car) => car.fuel_type))], [cars]);
  const maxPrice = useMemo(() => Math.max(...cars.map((c) => c.daily_rate_inr), 50000), [cars]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-light">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-brand-light">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-xl border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-brand-light pt-24 pb-10"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
            Our Premium <span className="text-brand-purple">Fleet</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of luxury and standard vehicles. Comfort and style guaranteed.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden w-full bg-white p-4 rounded-xl shadow-sm flex items-center justify-between font-bold text-brand-dark"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            {showFilters ? <FaTimes /> : <FaFilter />}
          </button>

          {/* Sidebar Filters */}
          <aside className={`lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-24 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-2 mb-6 text-brand-purple border-b border-gray-100 pb-4">
              <FaFilter />
              <h3 className="text-xl font-bold">Filters</h3>
            </div>

            <div className="space-y-6">
              {/* Make Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Make</label>
                <select
                  value={filters.make}
                  onChange={(e) => handleFilterChange("make", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                >
                  {makes.map(make => <option key={make} value={make}>{make}</option>)}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Car Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                >
                  {types.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>

              {/* Fuel Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Fuel Type</label>
                <select
                  value={filters.fuel_type}
                  onChange={(e) => handleFilterChange("fuel_type", e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none"
                >
                  {fuels.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">Max Price</label>
                  <span className="text-sm font-bold text-brand-purple">₹{filters.priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="100"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
                />
              </div>

              <button
                onClick={() => setFilters({ make: "All", type: "All", fuel_type: "All", priceRange: maxPrice })}
                className="w-full mt-4 py-2 text-sm font-bold text-gray-500 hover:text-brand-purple transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Cars Grid */}
          <div className="lg:w-3/4">
            {filteredCars.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No cars match your filters.</p>
                <button
                  onClick={() => setFilters({ make: "All", type: "All", fuel_type: "All", priceRange: maxPrice })}
                  className="mt-4 text-brand-purple font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredCars.map((car) => (
                    <CarCard key={car._id || car.id} car={car} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </motion.section>
  );
}
