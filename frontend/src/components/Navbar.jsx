import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MediCare+
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/doctors" className={navLinkStyle}>
            Doctors
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>

          {/* If NOT logged in */}
          {!user && (
            <>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            </>
          )}

          {/* If logged in */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                {user.name || "User"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                  <Link
                    to="/patient/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3 bg-white border-t">

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/doctors" className={navLinkStyle}>
            Doctors
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>

          <NavLink to="/contact" className={navLinkStyle}>
            Contact
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            </>
          )}

          {user && (
            <>
              <Link to="/patient/dashboard" className="text-blue-600">
                Dashboard
              </Link>

              <button onClick={handleLogout} className="text-red-500 text-left">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;