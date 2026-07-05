import { useEffect, useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

const handleBook = (doctorId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first to book appointment");
    navigate("/login");
    return;
  }

  navigate(`/book/${doctorId}`);
};
  // FETCH DOCTORS
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data.doctors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // FILTER DOCTORS
  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Our Doctors
        </h1>

        {/* SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded"
          />
        </div>

        {/* DOCTOR GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded shadow text-center hover:shadow-lg transition"
              >

                <img
                  src={doc.image}
                  alt="doctor"
                  className="w-24 h-24 mx-auto rounded-full"
                />

                <h2 className="mt-4 text-xl font-semibold">
                  {doc.name}
                </h2>

                <p className="text-gray-500">
                  {doc.specialization}
                </p>

                <p className="text-sm mt-1">
                  Experience: {doc.experience} years
                </p>

                <p className="text-sm font-medium mt-1">
                  Fee: Rs. {doc.fee}
                </p>

                <button
                  onClick={() => handleBook(doc._id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Book Appointment
                </button>

              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No doctors found
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default Doctors;