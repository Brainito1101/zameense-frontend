import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyLand = () => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const params = new URLSearchParams(locationHook.search);

  const urlLocation = params.get("location") || "";
  const urlType = params.get("type") || "";
  const urlPrice = params.get("price") || "";
 

  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 FILTER STATES
  const [location, setLocation] = useState(urlLocation);
  const [landType, setLandType] = useState(urlType);
  const [priceRange, setPriceRange] = useState(urlPrice);
  const [sortType, setSortType] = useState("");

  // 📄 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 🚀 FETCH DATA
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/lands/")
      .then((res) => {
        setLands(res.data);
        setFilteredLands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔍 FILTER + SORT
  useEffect(() => {
    let data = [...lands];

    if (location) {
      data = data.filter(item =>
        item.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (landType) {
      data = data.filter(
        (item) =>
          item.property_type?.toLowerCase() === landType.toLowerCase()
      );
    }

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      data = data.filter((item) => {
        const price = parseFloat(item.price);
        return price >= min && price <= max;
      });
    }

    if (sortType === "low") {
      data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (sortType === "high") {
      data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    setFilteredLands(data);
    setCurrentPage(1);
  }, [location, landType, priceRange, sortType, lands]);

  // 📄 PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLands = filteredLands.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLands.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setLocation("");
    setLandType("");
    setPriceRange("");
    setSortType("");
    setCurrentPage(1);
    navigate("/buy-land", { replace: true });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">

      {/* 🔍 FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">

        <input
          placeholder="📍 Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        />

        <select
          value={landType}
          onChange={(e) => setLandType(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Land Type</option>
          <option value="agricultural">Agricultural</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Price Range</option>
          <option value="0-500000">Below ₹5L</option>
          <option value="500000-1000000">₹5L - ₹10L</option>
          <option value="1000000-5000000">₹10L - ₹50L</option>
          <option value="5000000-10000000">₹50L - ₹1Cr</option>
          <option value="10000000-999999999">Above ₹1Cr</option>
        </select>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

        <button
          onClick={clearFilters}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center py-10">Loading lands...</p>
      )}

      {/* EMPTY */}
      {!loading && filteredLands.length === 0 && (
        <p className="text-center py-10">No lands found</p>
      )}

      {/* 🏡 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {currentLands.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/land/${item.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >

            <img
  src={
    item.images?.[0]?.image
      ? item.images[0].image.startsWith("http")
        ? item.images[0].image
        : `http://127.0.0.1:8000${item.images[0].image}`
      : "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
  }
  alt={item.title}
  className="w-full h-56 object-cover"
  onError={(e) => {
    e.target.src = "https://dummyimage.com/400x300/cccccc/000000&text=Error";
  }}
/>
            <div className="p-4 space-y-2">

              <h3 className="font-semibold text-lg">{item.title}</h3>

              <p className="text-gray-500 text-sm">📍 {item.location}</p>

              <p className="text-green-700 font-bold">
                ₹{item.price}
              </p>

              <button
  onClick={() => {
    console.log("Clicked:", item.id); // debug
    navigate(`/land/${item.id}`);
  }}
  className="w-full mt-3 bg-[#FF9933] text-white py-2 rounded-lg"
>
  View Details
</button>
            </div>
          </div>
        ))}

      </div>

      {/* 📄 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page
                    ? "bg-[#FF9933] text-white"
                    : "bg-white"
                }`}
              >
                {page}
              </button>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default BuyLand;