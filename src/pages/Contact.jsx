export default function Contact() {
  return (
    <section className="pt-28 pb-16 bg-gray-50">

      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-center mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Get in Touch
            </h2>

            <p className="text-gray-600">
              Have questions about buying or selling land?  
              Our team is here to help you.
            </p>

            <p className="text-gray-700">
              📍 Surat, Gujarat, India
            </p>

            <p className="text-gray-700">
              📧 support@zameense.com
            </p>

            <p className="text-gray-700">
              📞 +91 98765 43210
            </p>
          </div>

          {/* Contact Form */}
          <form className="bg-white shadow-md rounded-xl p-8 space-y-6">

            <div>
              <label className="block mb-1 font-medium">
                Name
              </label>

              <input
                type="text"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Email
              </label>

              <input
                type="email"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Your Email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Message
              </label>

              <textarea
                rows="4"
                className="w-full border rounded-lg px-4 py-2"
                placeholder="Write your message..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
            >
              Send Message
              <p className="text-center mt-4 text-gray-500">
  We respond within 24 hours ⏱
</p>
            </button>
            

          </form>

        </div>

      </div>

    </section>
  );
}