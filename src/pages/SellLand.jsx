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
    website: ""
  });

  const [errors, setErrors] = useState({});

  // 🔄 HANDLE CHANGE (FIXED)
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // 🚀 SUBMIT (FIXED MAIN BUG)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit clicked");

    const data = new FormData();

    data.append("title", formData.full_name);
    data.append("location", formData.location);
    data.append("area", formData.size);
    data.append("property_type", formData.land_type);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("image", formData.image);

    try {
      const res = await API.post("lands/", data);

      console.log(res.data);
      alert("Land Added Successfully ✅");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Error: " + error.response?.status);
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

          <h2 className="text-2xl font-bold mb-6 text-center">
            Sell Your Land
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="full_name" placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <input name="phone" placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <input name="whatsapp" placeholder="WhatsApp Number"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <input name="email" placeholder="Email"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <input name="location" placeholder="Location"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

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
              placeholder="Price"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <textarea name="description"
              placeholder="Description"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg" />

            <input type="file" name="image"
              onChange={handleChange}
              className="w-full" />

            <button type="submit"
              className="w-full bg-[#FF9933] hover:bg-[#E67300] text-white py-3 rounded-lg font-semibold">
              Submit Land
            </button>

          </form>

        </div>
      </div>
    </>
  );
};

export default SellLand;