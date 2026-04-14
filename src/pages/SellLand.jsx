import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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
    website: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // 🔄 HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ VALIDATION (NO SIZE LIMIT NOW)
  const validate = () => {
    let newErrors = {};

    if (!formData.full_name) newErrors.full_name = "Full name required";

    if (!formData.phone.match(/^[0-9]{10}$/)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email";
    }

    if (!formData.location) newErrors.location = "Location required";

    if (!formData.price) newErrors.price = "Price required";

    if (formData.price) {
      const decimalPlaces = (formData.price.toString().split('.')[1] || '').length;
      if (decimalPlaces > 2) {
        newErrors.price = "Max 2 decimal places allowed";
      }
    }

    // ✅ ONLY TYPE CHECK (NO SIZE LIMIT)
    if (formData.image) {
      if (!["image/jpeg", "image/png"].includes(formData.image.type)) {
        newErrors.image = "Only JPG/PNG allowed";
      }
    }

    return newErrors;
  };

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("Submit clicked"); // ✅ debug

  const formData = new FormData();
  formData.append("title", title);
  formData.append("location", location);
  formData.append("area", area);
  formData.append("property_type", propertyType);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("image", image);

  try {
    const res = await API.post("lands/", formData); // ✅ FIXED

    console.log(res.data);
    alert("Land Added Successfully ✅");
  } catch (error) {
    console.log(error);
    alert("Error: " + error.response?.status);
  }
};

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Sell Your Land
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="full_name" placeholder="Full Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />
          <p className="text-red-500 text-sm">{errors.full_name}</p>

          <input name="phone" placeholder="Phone Number"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />
          <p className="text-red-500 text-sm">{errors.phone}</p>

          <input name="whatsapp" placeholder="WhatsApp Number"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <input name="email" placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />
          <p className="text-red-500 text-sm">{errors.email}</p>

          <input name="location" placeholder="Location"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />
          <p className="text-red-500 text-sm">{errors.location}</p>

          <input name="size" placeholder="Land Size"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <select name="land_type"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg">
            <option value="">Select Land Type</option>
            <option value="agricultural">Agricultural</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>

          <input type="number" name="price"
            placeholder="Price (e.g. 10000000)"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />
          <p className="text-red-500 text-sm">{errors.price}</p>

          <textarea name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg" />

          <input type="file" name="image"
            onChange={handleChange}
            className="w-full" />
          <p className="text-red-500 text-sm">{errors.image}</p>

          {/* honeypot */}
          <input type="text" name="website"
            onChange={handleChange}
            className="hidden" />

          <button type="submit"
            className="w-full bg-[#FF9933] hover:bg-[#E67300] text-white py-3 rounded-lg font-semibold">
            Submit Land
          </button>

        </form>

      </div>
    </div>
  );
};

export default SellLand;