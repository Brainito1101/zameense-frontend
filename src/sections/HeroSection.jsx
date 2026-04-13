import { useState } from "react";
import { motion } from "framer-motion";


export default function HeroSection({ onSearch }) {
  const [activeField, setActiveField] = useState(null);
  const [filters, setFilters] = useState({
    location: "",
    land_type: "",
    price: ""
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    if (onSearch) onSearch(filters);
    console.log("Search Filters:", filters);
  };

  return (
    <section className="relative w-full h-[85vh]">

      {/* Background */}
      <div
        className="w-full h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dxtkygjlk/image/upload/v1774347146/noah-ridge-6RPecz_0OEc-unsplash_gjkgxd.jpg')"
        }}
      >

        {/* Overlay */}
        <div className="w-full h-full bg-black/50 flex items-center justify-center">

          <div className="text-center text-white max-w-4xl px-6">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold"
            >
              Find Your Perfect{" "}
              <span className="text-[#FF9933]">Land</span>
            </motion.h1>

            {/* Subtext */}
            <p className="mt-4 text-gray-200 text-sm md:text-lg">
              Search verified agricultural, residential & commercial land
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-10 flex justify-center"
            >

              <div onMouseLeave={() => setActiveField(null)}  className="
  bg-white/95 backdrop-blur-md shadow-2xl 
  rounded-3xl md:rounded-full 
  p-4 md:p-2 
  flex flex-col md:flex-row 
  items-stretch md:items-center 
  gap-3 md:gap-2 
  w-full max-w-md md:max-w-5xl
">

                {/* Location */}
                <input
  type="text"
  name="location"
  placeholder="📍 Enter city or district"
  onChange={handleChange}
  onFocus={() => setActiveField("location")}
  onBlur={() => setActiveField(null)}
  onMouseEnter={() => setActiveField("location")}
  className={`
    w-full md:flex-1 px-4 py-3 md:py-2 text-black text-sm outline-none 
    rounded-xl md:rounded-full transition-all duration-300

    ${activeField === "location"
      ? "ring-2 ring-[#FF9933] bg-white"
      : "md:shadow-sm md:bg-transparent bg-gray-200"}
  `}
/>
                {/* Divider */}
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>

                {/* Land Type */}
 <select
  name="land_type"
  onChange={handleChange}
  onFocus={() => setActiveField("land_type")}
  onBlur={() => setActiveField(null)}
  onMouseEnter={() => setActiveField("land_type")}
  className={`
    w-full md:w-auto px-4 py-3 md:py-2 text-black text-sm 
    outline-none cursor-pointer rounded-xl md:rounded-full 
    transition-all duration-300

    ${activeField === "land_type"
      ? "ring-2 ring-[#FF9933] bg-white"
      : "md:shadow-sm md:bg-transparent bg-gray-300"}
  `}
>
                  <option value="">Land Type</option>
                  <option value="agricultural">Agricultural</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>

                {/* Divider */}
                <div className="hidden md:block w-px h-6 bg-gray-300"></div>

                {/* Price */}
                <select
  name="price"
  onChange={handleChange}
  onFocus={() => setActiveField("price")}
  onBlur={() => setActiveField(null)}
  onMouseEnter={() => setActiveField("price")}
  className={`
    w-full md:w-auto px-4 py-3 md:py-2 text-black text-sm 
    outline-none cursor-pointer rounded-xl md:rounded-full 
    transition-all duration-300

    ${activeField === "price"
      ? "ring-2 ring-[#FF9933] bg-white"
      : "md:shadow-sm md:bg-transparent bg-gray-300"}
  `}
>
                  <option value="">Price</option>
                  <option value="0-500000">Below 5L</option>
                  <option value="500000-1000000">5L - 10L</option>
                  <option value="1000000-5000000">10L - 50L</option>
                </select>

                {/* Search Button */}
                <button
  onClick={handleSearch}
  className="
    w-full md:w-auto 
    bg-[#FF9933] hover:bg-[#E67300] 
    text-white 
    px-6 py-3 md:py-2 
    rounded-xl md:rounded-full 
    font-semibold shadow-md 
    transition transform hover:scale-105
  "
>
  Search
</button>

              </div>
            </motion.div>

            {/* Trust Line */}
            <p className="mt-4 text-gray-300 text-sm">
              ✔ 1000+ Verified Lands  ✔ Trusted by 500+ Buyers
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}