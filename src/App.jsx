import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home";
import BuyLand from "./pages/BuyLand";
import SellLand from "./pages/SellLand";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LandDetail from "./pages/LandDetail";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Fees from "./pages/Fees";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FAQSection from "./sections/FAQSection";


// ✅ ADD THIS FUNCTION
function App() {

  return (
    <>
      {/* GLOBAL */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy-land" element={<BuyLand />} />
        <Route path="/sell-land" element={<SellLand />} />
        <Route path="/land/:id" element={<LandDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQSection />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* GLOBAL */}
      <Footer />
    </>
  );
}

// ✅ EXPORT
export default App;