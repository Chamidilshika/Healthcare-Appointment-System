import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import api from "../../services/api";

function BookAppointment() {
  const { doctorId } = useParams(); 
  
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (doctorId) {
      setDoctor(doctorId);
    }
  }, [doctorId]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/doctors");
        setDoctors(res.data.doctors);
      } catch (err) {
        console.error("Failed to load doctors list", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctor || !date || !time) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("TOKEN FROM STORAGE:", token);

      if (!token || token === "undefined") {
        alert("Please login again. Token missing or invalid.");
        return;
      }

      const res = await api.post(
        "/appointments",
        { doctor, date, time, reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Appointment Response:", res.data);
      alert("Appointment booked successfully!");
      setReason("");
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to book appointment");
    }
  };
  
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Book Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* 4. Disable the dropdown if the doctorId is already set from the URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Selected Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            disabled={!!doctorId} 
            className={`w-full border p-2 rounded ${doctorId ? "bg-gray-100 cursor-not-allowed" : ""}`}
          >
            <option value="" disabled>
              Select Doctor
            </option>

            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                Dr. {d.name} ({d.specialization})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Appointment Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Preferred Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-600">Reason for Visit</label>
          <textarea
            placeholder="Describe your symptoms briefly..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border p-2 rounded h-24 resize-none"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 w-full rounded transition">
          Book Now
        </button>

      </form>
    </div>
  );
}

export default BookAppointment;