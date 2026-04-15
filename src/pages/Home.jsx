import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import API from "../services/api";
import HowItWorksSection from "../sections/HowItWorksSection";
import HeroSection from "../sections/HeroSection";
import FeaturedListings from "../sections/FeaturedListings";
import FAQSection from "../sections/FAQSection";
import Contact from "../sections/Contact";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSearch = (filters) => {
    const { location, land_type, price } = filters;
    navigate(`/buy-land?location=${location}&type=${land_type}&price=${price}`);
  };

  useEffect(() => {
    API.get("lands/")
      .then((res) => {
        console.log("DATA:", res.data);
        setLands(res.data);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Buy & Sell Land in Gujarat | Zameense</title>
      </Helmet>



      {/* ✅ PASS onSearch HERE */}
      <HeroSection onSearch={handleSearch} />

      {/* Listings */}
      {loading ? (
        <p className="text-center mt-10">Loading lands...</p>
      ) : (
        <FeaturedListings lands={lands} loading={loading} />
      )}

      <HowItWorksSection />
      <FAQSection />
      <Contact />

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Zameense%2C%20I%20need%20help%20finding%20land%20or%20selling%20property.%20Can%20you%20assist%20me%3F"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-green-600 p-4 text-white shadow-lg shadow-green-600/30 transition hover:bg-green-700"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </>
  );
};

export default Home;