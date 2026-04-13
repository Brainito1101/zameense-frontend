import React from "react";
import { FaUserPlus, FaUpload, FaSearch, FaHandshake } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaUpload />,
    title: "Post Land",
    desc: "Add land details with images and price."
  },
  {
    icon: <FaSearch />,
    title: "Buyers View",
    desc: "Your listing is visible to interested buyers."
  },
  {
    icon: <FaHandshake />,
    title: "Direct Contact",
    desc: "Buyers contact you directly without middleman."
  },
  {
    icon: <FaCheckCircle />,
    title: "Close Deal",
    desc: "Finalize your deal easily and securely."
  }
];
const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-gray-50 text-center">

      <h2 className="text-3xl font-bold mb-4">How It Works</h2>
      <p className="text-gray-600 mb-10">
        Simple steps to buy & sell land on Zameense
      </p>

      <div className="max-w-6xl mx-auto grid gap-6 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg hover:-translate-y-2 transition duration-300"
          >
            <div className="text-orange-500 text-3xl mb-3 flex justify-center">
              {step.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
            <p className="text-gray-500 text-sm">{step.desc}</p>
          </div>
        ))}

      </div>

    </section>
  );
};

export default HowItWorksSection;