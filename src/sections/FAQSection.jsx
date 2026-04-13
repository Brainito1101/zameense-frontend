import React, { useState } from "react";

const faqs = [
  {
    question: "How can I list my land?",
    answer: "Click on 'Sell Land' and fill out the property details form."
  },
  {
    question: "Is Zameense free to use?",
    answer: "Yes, basic listing is free. Premium services may apply."
  },
  {
    question: "How do I contact a seller?",
    answer: "Click on 'View Details' and use the contact options."
  },
  {
    question: "Are listings verified?",
    answer: "Yes, all listings go through a verification process."
  }
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="py-20 bg-white">
      
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4 px-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex justify-between items-center font-semibold text-left"
            >
              {faq.question}
              <span className="text-orange-500 text-xl">
                {open === index ? "-" : "+"}
              </span>
            </button>

            {open === index && (
              <p className="mt-3 text-gray-600 text-sm">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;