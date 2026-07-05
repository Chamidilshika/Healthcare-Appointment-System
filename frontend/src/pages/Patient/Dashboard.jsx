import { useEffect, useState } from "react";
import api from "../../services/api";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/appointments/patient", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAppointments(res.data.appointments);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // CANCEL APPOINTMENT
  const cancelAppointment = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel?"
    );

    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  // STATUS COLOR
  const statusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";

      case "completed":
        return "bg-blue-500";

      case "cancelled":
        return "bg-red-500";

      default:
        return "bg-yellow-500";
    }
  };

  // STATS
  const total = appointments.length;
  const pending = appointments.filter(a => a.status === "pending").length;
  const approved = appointments.filter(a => a.status === "approved").length;
  const completed = appointments.filter(a => a.status === "completed").length;
  const cancelled = appointments.filter(a => a.status === "cancelled").length;

  // FILTER + SEARCH
  const filteredAppointments = appointments
    .filter((app) => {
      if (filter === "all") return true;
      return app.status === filter;
    })
    .filter((app) =>
      app.doctor?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* ================= HEADER ================= */}
      <h1 className="text-3xl font-bold mb-6">
        Patient Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          Total: {total}
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          Pending: {pending}
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          Approved: {approved}
        </div>

        <div className="bg-blue-100 p-4 rounded shadow">
          Completed: {completed}
        </div>

        <div className="bg-red-100 p-4 rounded shadow">
          Cancelled: {cancelled}
        </div>

      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {/* ================= APPOINTMENTS ================= */}
      <div className="space-y-4">

        {filteredAppointments.length === 0 ? (
          <div className="bg-white p-4 rounded shadow text-center">
            No appointments found
          </div>
        ) : (
          filteredAppointments.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >

              {/* LEFT */}
              <div>
                <h2 className="font-bold text-lg">
                  Dr. {app.doctor?.name}
                </h2>

                <p className="text-gray-600">
                  {app.doctor?.email}
                </p>

                <p className="text-sm">
                  Date: {app.date} | Time: {app.time}
                </p>

                <p className="text-sm">
                  Reason: {app.reason}
                </p>
              </div>

              {/* STATUS */}
              <div>
                <span className={`${statusColor(app.status)} text-white px-3 py-1 rounded`}>
                  {app.status}
                </span>
              </div>

              {/* ACTION */}
              <div>
                {app.status === "pending" && (
                  <button
                    onClick={() => cancelAppointment(app._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                )}
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default PatientDashboard;