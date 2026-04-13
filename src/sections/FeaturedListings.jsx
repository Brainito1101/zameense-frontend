import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import Slider from "react-slick";
import { FaWhatsapp } from "react-icons/fa";

const FeaturedListings = () => {
  const navigate = useNavigate();
  
  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
};
  // 🔥 STATES
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // ✅ FETCH DATA FROM BACKEND
  useEffect(() => {
    API.get("lands/")
      .then((res) => {
        console.log("API DATA:", res.data);
        setLands(res.data);
      })
      .catch((err) => {
        console.log("API ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🔄 SORTING
  const sortedLands = [...lands].sort((a, b) => {
    if (sortType === "low") return parseFloat(a.price) - parseFloat(b.price);
    if (sortType === "high") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  // 📄 PAGINATION
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLands = sortedLands.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(lands.length / itemsPerPage);

  // 🔝 SCROLL TO TOP
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gray-50">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold">Featured Lands</h2>

        {/* SORT */}
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border px-4 py-2 rounded-lg"
        >
          <option value="">Sort</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* RESULT COUNT */}
      {!loading && lands.length > 0 && (
        <p className="max-w-7xl mx-auto px-4 text-gray-500 mb-4">
          Showing {indexOfFirst + 1} -{" "}
          {Math.min(indexOfLast, lands.length)} of {lands.length} lands
        </p>
      )}

      {/* LOADING */}
      {loading && (
        <p className="text-center py-10 text-lg">Loading properties...</p>
      )}

      {/* EMPTY STATE */}
      {!loading && lands.length === 0 && (
        <p className="text-center py-10 text-lg">No listings found</p>
      )}

      {/* LISTINGS */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {currentLands.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/land/${item.id}`)}
            className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 h-full flex flex-col"
          >

            {/* IMAGE SLIDER */}
<div className="relative">

  {item.images?.length > 0 ? (
    <Slider {...sliderSettings}>
  {item.images.map((img, index) => (
    <div key={index}>
      <img
        src={img.image}
        alt="land"
        className="w-full h-48 object-cover rounded-t-2xl"
      />
    </div>
  ))}
</Slider>
  ) : (
    <img
      src="https://via.placeholder.com/300?text=No+Image"
      alt="land"
      className="w-full h-48 object-cover rounded-t-2xl"
    />
  )}

  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow">
    Verified
  </span>

</div>

            {/* CONTENT */}
            <div className="p-5 space-y-2 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold capitalize">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  📍 {item.location}
                </p>

                <p className="text-green-700 font-bold text-lg">
                  ₹{item.price}
                </p>

                <p className="text-sm">📐 {item.area}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/land/${item.id}`);
                }}
                className="w-full mt-4 bg-[#FF9933] hover:bg-[#E67300] text-white py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition duration-300"
              >
                View Details
              </button>

            </div>
          </div>
        ))}
      </div>
      

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10 gap-2 flex-wrap">

          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === page
                    ? "bg-[#FF9933] text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}
    </section>
  );
};

export default FeaturedListings;