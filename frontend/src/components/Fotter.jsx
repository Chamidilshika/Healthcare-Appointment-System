import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">

      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            MediCare+
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            A smart healthcare appointment system that connects patients with certified doctors instantly.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>

          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-white">Doctors</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
            <li><Link to="/register" className="hover:text-white">Register</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>

          <ul className="space-y-2 text-gray-400">
            <li>Online Consultation</li>
            <li>Appointment Booking</li>
            <li>Doctor Search</li>
            <li>Medical Records</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>

          <p className="text-gray-400 text-sm">
            Email: support@medicare.com
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Phone: +94 77 123 4567
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Colombo, Sri Lanka
          </p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} MediCare+. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;