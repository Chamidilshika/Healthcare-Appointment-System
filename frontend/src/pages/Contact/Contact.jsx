import { useState } from "react";
import api from "../../services/api";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/contact", form);

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    alert(error.response?.data?.message || "Failed to send message");
  }
};

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* CONTACT INFO */}
        <div className="bg-white shadow p-6 rounded">

          <h2 className="text-xl font-semibold mb-4">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-2">
            📧 Email: support@medicare.com
          </p>

          <p className="text-gray-600 mb-2">
            📞 Phone: +94 77 123 4567
          </p>

          <p className="text-gray-600">
            📍 Colombo, Sri Lanka
          </p>

        </div>

        {/* CONTACT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow p-6 rounded"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full border p-3 mb-3 rounded"
            rows="5"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}

export default Contact;