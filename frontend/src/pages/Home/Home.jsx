import { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import HeroSectionImg from '../../assets/HeroSectionImg.jpg'
import Doctor from '../../assets/Doctor.jpg'
import Footer from "../../components/Fotter";
import api from "../../services/api";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [featuredDoctors, setFeaturedDoctors] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      
      navigate(`/doctors?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/doctors");
    }
  };

  useEffect(() => {
    const loadDoctors = async () => {
    const res = await api.get("/doctors");

    setFeaturedDoctors(res.data.doctors.slice(0, 3));
    };
    loadDoctors();
  }, []);

  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>

            <h1 className="text-5xl font-bold leading-tight">
              Book Your Doctor Appointment <br />
              <span className="text-black">Anytime, Anywhere</span>
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Search experienced doctors, schedule appointments,
              receive notifications and manage your healthcare online.
            </p>

            {/* SEARCH */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 flex flex-col md:flex-row gap-3"
            >

              <input
                type="text"
                placeholder="Search by doctor or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 rounded text-black"
              />

              <button
                type="submit"
                className="bg-white hover:bg-gray-300 text-black px-6 py-3 rounded font-semibold"
              >
                Search
              </button>

            </form>

            <div className="mt-8 flex gap-4">

              <button
                onClick={() => navigate("/doctors")}
                className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-100"
              >
                Find Doctors
              </button>

              <button
                onClick={() => navigate("/register")}
                className="border border-white px-6 py-3 rounded hover:bg-white hover:text-blue-700"
              >
                Register
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div>

            <img
              src={HeroSectionImg}
              alt="Doctor"
              className="rounded-xl shadow-2xl"
            />

          </div>

        </div>
      </section>

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Our Healthcare Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">

              <div className="text-5xl mb-4">🩺</div>

              <h3 className="text-xl font-bold">
                Expert Doctors
              </h3>

              <p className="mt-3 text-gray-600">
                Experienced doctors verified by the administrator.
              </p>

            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">

              <div className="text-5xl mb-4">📅</div>

              <h3 className="text-xl font-bold">
                Online Booking
              </h3>

              <p className="mt-3 text-gray-600">
                Book appointments instantly without waiting in long queues.
              </p>

            </div>

            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">

              <div className="text-5xl mb-4">📧</div>

              <h3 className="text-xl font-bold">
                Instant Notifications
              </h3>

              <p className="mt-3 text-gray-600">
                Receive Email and SMS notifications for appointment updates.
              </p>

            </div>

          </div>

        </div>

      </section>
      

      {/* FEATURED DOCTORS */}
      <section className="py-20 bg-gray-100">

        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Featured Doctors
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredDoctors.map((doctor)=>(
            <div
                key={doctor._id}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition"
            >

                  <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover"
                  />

                <h3 className="mt-4 text-xl font-bold">
                  {doctor.name}
                </h3>

                <p className="text-gray-500">
                  {doctor.specialization}
                </p>

                <p className="mt-2">
                  Experience: {doctor.experience} Years
                </p>

                <p>
                  Fee: Rs. {doctor.fee}
                </p>

                <button
                    onClick={()=>navigate(`/book/${doctor._id}`)}
                    className="mt-5 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                    >
                  Book Appointment
                </button>

            </div>

             ))}

          </div>

        </div>

      </section>

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Our Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="shadow rounded-xl p-8">
                  <h3 className="font-bold text-xl">
                      Appointment Booking
                  </h3>

                  <p className="mt-3">Book appointments online anytime.</p>
              </div>

            <div className="shadow rounded-xl p-8">

            <h3 className="font-bold text-xl">Doctor Management</h3>

            <p className="mt-3">Verified doctors managed by administrators.</p>

        </div>

          <div className="shadow rounded-xl p-8">
              <h3 className="font-bold text-xl">Email & SMS Alerts</h3>
              <p className="mt-3">Receive appointment notifications instantly.</p>
          </div>

          <div className="shadow rounded-xl p-8">
              <h3 className="font-bold text-xl">Patient Dashboard</h3>
              <p className="mt-3">Track all your appointments.</p>
          </div>

          <div className="shadow rounded-xl p-8">
              <h3 className="font-bold text-xl">Doctor Dashboard</h3>
              <p className="mt-3">Approve or complete appointments.</p>
          </div>

          <div className="shadow rounded-xl p-8">
              <h3 className="font-bold text-xl">Admin Dashboard</h3>
              <p className="mt-3">Manage doctors, users and appointments.</p>
          </div>

        </div>

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-gray-900 text-white text-center px-4">
        <h2 className="text-3xl font-bold">
          Ready to Book Your Appointment?
        </h2>

        <p className="mt-2 text-gray-400">
          Join thousands of patients using our platform
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-6 bg-blue-600 px-6 py-3 rounded font-medium transition-colors hover:bg-blue-700"
        >
          Get Started
        </button>
      </section>
      
      <section className="py-20" bg-gray-300>

              <h2 className="text-center text-4xl font-bold">Patient Reviews</h2>

              <div className="grid md:grid-cols-3 gap-8 mt-14">

                  <div className="bg-white shadow rounded-xl p-8">
                          ⭐⭐⭐⭐⭐

                        <p className="mt-4">Booking an appointment was quick and simple.</p>

                        <h4 className="mt-5 font-bold">- Nimal Perera</h4>

                  </div>

                  <div className="bg-white shadow rounded-xl p-8">
                            ⭐⭐⭐⭐⭐

                      <p>Professional doctors and excellent service.</p>
                            <h4 className="mt-5 font-bold">- Dilani Silva</h4>

                  </div>

                  <div className="bg-white shadow rounded-xl p-8">
                          ⭐⭐⭐⭐⭐

                        <p>Highly recommended healthcare platform.</p>

                            <h4 className="mt-5 font-bold">- Kasun Fernando</h4>

                  </div>

              </div>

      </section>

      <Footer />

    </div>
  );
}

export default Home;