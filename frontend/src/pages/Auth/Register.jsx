import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import registerImage from "../../assets/Register.jpg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
      });

      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-emerald-500 items-center justify-center">
        <img
          src={registerImage}
          alt="Register"
          className="w-3/4 drop-shadow-2xl animate-pulse hover:scale-105 transition duration-500"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleRegister}
          className="bg-white p-10 rounded-2xl shadow-xl w-96 transform transition-all duration-500 hover:scale-[1.02]"
        >

          <h2 className="text-3xl font-bold mb-2 text-center text-green-600">
            Register
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Join our healthcare system
          </p>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 mb-3 rounded-lg focus:outline-green-500 focus:ring-2 focus:ring-green-200 transition"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 mb-3 rounded-lg focus:outline-green-500 focus:ring-2 focus:ring-green-200 transition"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 mb-3 rounded-lg focus:outline-green-500 focus:ring-2 focus:ring-green-200 transition"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            className="w-full border p-3 mb-5 rounded-lg focus:outline-green-500 focus:ring-2 focus:ring-green-200 transition"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Register
          </button>

          <p className="text-center text-sm mt-4 text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-green-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;