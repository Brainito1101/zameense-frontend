import React, { useState } from "react";
import API from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await API.post("contact/", formData);
      setSuccess(res.data.message || "Message sent successfully.");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          "Could not send message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      
      <h2 className="text-3xl font-bold text-center mb-12">
        Contact Us
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4">

        {/* LEFT INFO */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Get in touch</h3>

          <p className="text-gray-600">
            Have questions? We're here to help you buy or sell land easily.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>📞 +91 9876543210</p>
            <p>📧 info@zameense.com</p>
            <p>📍 Ahmedabad, India</p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hi%20Zameense%2C%20I%20need%20help%20buying%20or%20selling%20land.%20Can%20you%20assist%20me%3F"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
          >
            WhatsApp Us
          </a>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          {success && (
            <p className="text-green-700 font-medium">{success}</p>
          )}
          {error && (
            <p className="text-red-600 font-medium">{error}</p>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone / WhatsApp"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
            rows={5}
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#FF9933] hover:bg-[#E67300] text-white py-3 rounded-lg font-medium shadow disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>

      </div>
    </section>
  );
};

export default Contact;
