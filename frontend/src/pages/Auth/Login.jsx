import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";
import loginImage from "../../assets/Login.jpg";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.token) {
        login(res.data.user, res.data.token);

        switch (res.data.user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "doctor":
            navigate("/doctor/dashboard");
            break;
          default:
            navigate("/patient/dashboard");
        }
      } else {
        alert("Login failed: Token not provided by server.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
        <img
          src={loginImage}
          alt="Login"
          className="w-3/4 drop-shadow-2xl animate-pulse"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">

        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-2xl shadow-xl w-96"
        >

          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Login to your account
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 mb-4 rounded-lg focus:outline-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 mb-4 rounded-lg focus:outline-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;