import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import API from "../services/api";

const LandDetail = () => {
  const { id } = useParams();

  const [land, setLand] = useState(null);

  useEffect(() => {
    API.get(`lands/${id}/`)
      .then((res) => {
        setLand(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!land) return <p className="text-center mt-10">Loading...</p>;

  const ownerPhone = land.owner_phone || "";
  const whatsappNumber = ownerPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;
  const hasPhone = whatsappNumber.length > 0;

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-4">{land.title}</h1>

      {/* IMAGE */}
      {/* IMAGE */}
<img
  src={
    land.images?.[0]?.image
      ? land.images[0].image.startsWith("http")
        ? land.images[0].image
        : `http://127.0.0.1:8000${land.images[0].image}`
      : "https://dummyimage.com/600x400/cccccc/000000&text=No+Image"
  }
  alt={land.title}
  className="w-full h-80 object-cover rounded-xl mb-6"
  onError={(e) => {
    e.target.src = "https://dummyimage.com/600x400/cccccc/000000&text=Error";
  }}
/>

      {/* DETAILS */}
      <div className="space-y-2">
        <p>📍 {land.location}</p>
        <p>🏷 Type: {land.property_type}</p>
        <p className="text-green-700 font-bold text-xl">₹{land.price}</p>
        <p>📐 Area: {land.area}</p>
      </div>

      {/* CONTACT OWNER */}
      <div className="mt-8 rounded-3xl border border-green-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-3">Contact the Owner</h2>
        <p className="text-gray-700 mb-4">
          {land.owner_name
            ? `Owner: ${land.owner_name}`
            : "Get in touch with the property owner directly."}
        </p>

        {hasPhone ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href={`tel:${whatsappNumber}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-green-50 px-5 py-3 text-green-800 font-semibold shadow-sm transition hover:bg-green-100"
            >
              <FaPhoneAlt className="text-lg" />
              Call Now
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white font-semibold shadow hover:bg-green-700 transition"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </div>
        ) : (
          <p className="text-gray-600">Owner phone number is not available.</p>
        )}
      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">Description</h3>
        <p className="text-gray-600">{land.description}</p>
      </div>

      {/* MAP */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">📍 Location Map</h3>

        <iframe
          src={`https://www.google.com/maps?q=${land.location}&output=embed`}
          className="w-full h-64 rounded-lg border"
          loading="lazy"
        />
      </div>

    </div>
  );
};

export default LandDetail;