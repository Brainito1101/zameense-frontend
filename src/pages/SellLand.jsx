import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Helmet } from "react-helmet-async";

const SellLand = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    location: "",
    size: "",
    land_type: "",
    price: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.size.trim()) newErrors.size = "Land size is required";
    if (!formData.land_type) newErrors.land_type = "Please select land type";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // ✅ Send everything in ONE FormData request (backend handles image)
      const formPayload = new FormData();
      formPayload.append("title", formData.full_name);
      formPayload.append("location", formData.location);
      formPayload.append("area", formData.size);
      formPayload.append("property_type", formData.land_type);
      formPayload.append("price", formData.price);
      formPayload.append("description", formData.description);
      formPayload.append("owner_name", formData.full_name);
      formPayload.append("owner_phone", formData.phone);

      if (formData.image) {
        formPayload.append("image", formData.image); // ✅ backend reads this
      }

      await API.post("lands/", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Land Added Successfully ✅");
      navigate("/");
    } catch (error) {
      console.log("ERROR DETAIL:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sell Your Land | Zameense</title>
        <meta name="description" content="Post your land for sale easily on Zameense." />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Sell Your Land</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <input
                name="full_name"
                placeholder="Full Name *"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.full_name ? "border-red-500" : ""}`}
              />
              {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
            </div>

            <div>
              <input
                name="phone"
                placeholder="Phone Number *"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <input
                name="whatsapp"
                placeholder="WhatsApp Number"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            <div>
              <input
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                name="location"
                placeholder="Location *"
                value={formData.location}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.location ? "border-red-500" : ""}`}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <input
                name="size"
                placeholder="Land Size (e.g. 2 acre) *"
                value={formData.size}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.size ? "border-red-500" : ""}`}
              />
              {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
            </div>

            <div>
              <select
                name="land_type"
                value={formData.land_type}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.land_type ? "border-red-500" : ""}`}
              >
                <option value="">Select Land Type *</option>
                <option value="agricultural">Agricultural</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
              {errors.land_type && <p className="text-red-500 text-sm mt-1">{errors.land_type}</p>}
            </div>

            <div>
              <input
                type="number"
                name="price"
                placeholder="Price *"
                value={formData.price}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full border p-3 rounded-lg ${errors.description ? "border-red-500" : ""}`}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF9933] hover:bg-[#E67300] text-white py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Land"}
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default SellLand;