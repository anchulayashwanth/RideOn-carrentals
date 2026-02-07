import { useEffect, useState, useMemo } from "react";
import api from "../api/api.js"; // UPDATED
import CarCard from "../components/CarCard.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    make: "All",
    type: "All",
    fuel_type: "All",
    priceRange: 50000,
  });

  // Fetch Cars
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/api/cars");
        console.log("✅ Cars fetched:", res.data);
        const carData = Array.isArray(res.data) ? res.data.filter(c => c !== null && typeof c === 'object') : [];
        setCars(carData);
        setFilteredCars(carData);
      } catch (err) {
        console.error("❌ Error fetching cars:", err);
        setError(`Failed to load cars. Details: ${err.message}`);
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

  const makes = useMemo(() => ["All", ...new Set(cars.filter(c => c && c.make).map((c) => c.make))], [cars]);
  const types = useMemo(() => ["All", ...new Set(cars.filter(c => c && c.type).map((c) => c.type))], [cars]);
  const fuels = useMemo(() => ["All", ...new Set(cars.filter(c => c && c.fuel_type).map((c) => c.fuel_type))], [cars]);
  const maxPrice = useMemo(() => {
    const prices = cars.map((c) => c.daily_rate_inr).filter(p => typeof p === 'number' && !isNaN(p));
    return prices.length > 0 ? Math.max(...prices) : 50000;
  }, [cars]);

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
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-brand-light pt-24 pb-10">
      <div className="container mx-auto px-6">
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">
            Our Premium <span className="text-brand-purple">Fleet</span>
          </h2>
          <p className="text-gray-600">
            Choose from our wide range of luxury and standard vehicles.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            className="lg:hidden bg-white p-4 rounded-xl shadow-sm flex items-center justify-between text-brand-dark font-bold"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span>Filters</span>
            {showFilters ? <FaTimes /> : <FaFilter />}
          </button>

          {/* Filters */}
          <aside className={`lg:w-1/4 bg-white p-6 rounded-xl shadow-lg border ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center gap-2 mb-6">
              <FaFilter className="text-brand-purple" />
              <h3 className="text-xl font-bold">Filters</h3>
            </div>

            <div className="space-y-6">
              {/* Make */}
              <div>
                <label className="block font-bold mb-2">Make</label>
                <select
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  value={filters.make}
                  onChange={(e) => handleFilterChange("make", e.target.value)}
                >
                  {makes.map((make) => (
                    <option key={make}>{make}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block font-bold mb-2">Car Type</label>
                <select
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  value={filters.type}
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Fuel */}
              <div>
                <label className="block font-bold mb-2">Fuel Type</label>
                <select
                  className="w-full p-3 bg-gray-50 border rounded-lg"
                  value={filters.fuel_type}
                  onChange={(e) => handleFilterChange("fuel_type", e.target.value)}
                >
                  {fuels.map((fuel) => (
                    <option key={fuel}>{fuel}</option>
                  ))}
                </select>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-bold">Max Price</span>
                  <span className="text-brand-purple font-bold">₹{filters.priceRange}</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  step="100"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange("priceRange", Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={() => setFilters({ make: "All", type: "All", fuel_type: "All", priceRange: maxPrice })}
                className="w-full mt-4 text-gray-500 hover:text-brand-purple font-bold"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Cars */}
          <div className="lg:w-3/4">
            {filteredCars.length === 0 ? (
              <div className="text-center bg-white p-10 rounded-xl border">
                <p className="text-gray-500">No cars match your filters.</p>
              </div>
            ) : (
              <motion.div
                layout
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filteredCars.map((car) => (
                    <CarCard key={car._id} car={car} />
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
