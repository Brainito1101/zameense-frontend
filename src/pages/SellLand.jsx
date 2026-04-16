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
    website: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔄 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ✅ VALIDATE
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

    // ✅ Validate before submit
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      // 🟢 Create Land
      const landRes = await API.post("lands/", {
        title: formData.full_name,
        location: formData.location,
        area: formData.size,
        property_type: formData.land_type,
        price: formData.price,
        description: formData.description,
        owner_name: formData.full_name,
        owner_phone: formData.phone,
        owner_whatsapp: formData.whatsapp,
        owner_email: formData.email,
      });

      // 🟡 Upload Image
      if (formData.image) {
  const landId = parseInt(landRes.data.id); // ✅ get as integer
  const imageData = new FormData();
  imageData.append("image", formData.image); // ✅ only image in FormData

  await API.post(`land-images/?land=${landId}`, imageData, { // ✅ land in URL
    headers: { "Content-Type": "multipart/form-data" },
  });
}

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

            {/* Full Name */}
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

            {/* Phone */}
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

            {/* WhatsApp */}
            <div>
              <input
                name="whatsapp"
                placeholder="WhatsApp Number"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
              />
            </div>

            {/* Email */}
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

            {/* Location */}
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

            {/* Size */}
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

            {/* Land Type */}
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

            {/* Price */}
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

            {/* Description */}
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

            {/* Image */}
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