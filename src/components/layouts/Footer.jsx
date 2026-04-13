import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-800 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-8">

        {/* Brand */}
        <div>
          <img src={logo} alt="Zameense" className="h-5 mb-4" />

          <p className="text-sm mt-2 text-gray-800">
            India's trusted platform for discovering and listing verified land.
          </p>

          <div className="mt-4 text-sm text-gray-700 space-y-2">
          
            <p>
              <a href="mailto:support@zameense.com" className="hover:text-[#FF9933] transition">
                support@zameense.com
              </a>
            </p>
            <p>
              <a href="tel:+919876543210" className="hover:text-[#FF9933] transition">
                +91 98765 43210
              </a>
            </p>
          </div>

          <div className="flex gap-4 mt-4 text-lg">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="hover:text-[#FF9933] transition" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-[#FF9933] transition" />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp className="hover:text-[#FF9933] transition" />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <Link to="/about" className="hover:text-[#FF9933] transition">About</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-[#FF9933] transition">Services</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#FF9933] transition">Blog</Link>
            </li>
            <li>
              <Link to="/sell-land" className="hover:text-[#FF9933] transition">Sell Land</Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-medium mb-3">Support</h3>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <Link to="/contact" className="hover:text-[#FF9933] transition">Contact</Link>
            </li>
            <li>
              <Link to="/fees" className="hover:text-[#FF9933] transition">Fees</Link>
            </li>
            <li>
              <a href="/#faq" className="hover:text-[#FF9933] transition">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-medium mb-3">Legal</h3>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <Link to="/terms" className="hover:text-[#FF9933] transition">Terms</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-[#FF9933] transition">Privacy</Link>
            </li>
          </ul>
        </div>

        {/* Types of Lands */}
        <div>
          <h3 className="font-medium mb-3">Types of Land</h3>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <Link to="/buy-land?type=agricultural" className="hover:text-[#FF9933] transition">Agricultural Land</Link>
            </li>
            <li>
              <Link to="/buy-land?type=residential" className="hover:text-[#FF9933] transition">Residential Land</Link>
            </li>
            <li>
              <Link to="/buy-land?type=commercial" className="hover:text-[#FF9933] transition">Commercial Land</Link>
            </li>
            <li>
              <Link to="/buy-land?type=industrial" className="hover:text-[#FF9933] transition">Industrial Land</Link>
            </li>
            <li>
              <Link to="/buy-land?type=farm" className="hover:text-[#FF9933] transition">Farm Land</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-400 mt-8 pt-4 text-center text-sm text-gray-800">
        © 2026 Zameense. All rights reserved. Built for buyers and sellers of verified land.
      </div>
    </footer>
  )
}