import { useEffect, useState } from "react";
import api from "../../services/api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch Appointments
  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/appointments/doctor", {
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

  // Update Appointment Status
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/appointments/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();
    } catch (error) {
      console.log(error);
    }
  };

  // Cancel Confirmation
  const cancelAppointment = (id) => {
    const ok = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (ok) {
      updateStatus(id, "cancelled");
    }
  };

  // Status Badge Color
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

  // Statistics
  const pending = appointments.filter(
    (a) => a.status === "pending"
  ).length;

  const approved = appointments.filter(
    (a) => a.status === "approved"
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "completed"
  ).length;

  const cancelled = appointments.filter(
    (a) => a.status === "cancelled"
  ).length;

  // Search + Filter
  const filteredAppointments = appointments
    .filter((app) => {
      if (filter === "all") return true;
      return app.status === filter;
    })
    .filter((app) =>
      app.patient?.name
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
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-center mb-8">
        Doctor Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-yellow-100 p-5 rounded-lg shadow">
          <h2 className="font-semibold">Pending</h2>
          <p className="text-3xl font-bold">
            {pending}
          </p>
        </div>

        <div className="bg-green-100 p-5 rounded-lg shadow">
          <h2 className="font-semibold">Approved</h2>
          <p className="text-3xl font-bold">
            {approved}
          </p>
        </div>

        <div className="bg-blue-100 p-5 rounded-lg shadow">
          <h2 className="font-semibold">Completed</h2>
          <p className="text-3xl font-bold">
            {completed}
          </p>
        </div>

        <div className="bg-red-100 p-5 rounded-lg shadow">
          <h2 className="font-semibold">Cancelled</h2>
          <p className="text-3xl font-bold">
            {cancelled}
          </p>
        </div>

      </div>

      {/* Search & Filter*/}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3 flex-1"
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>

      {/* Appointment List */}

      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          No appointments found.
        </div>
      ) : (
        filteredAppointments.map((app) => (
          <div
            key={app._id}
            className="bg-white rounded-lg shadow p-6 mb-5 flex flex-col md:flex-row justify-between gap-6"
          >

            {/* Patient Information */}

            <div>

              <h2 className="text-xl font-bold">
                {app.patient?.name}
              </h2>

              <p className="text-gray-600">
                {app.patient?.email}
              </p>

              <p className="mt-2">
                <strong>Date:</strong> {app.date}
              </p>

              <p>
                <strong>Time:</strong> {app.time}
              </p>

              <p>
                <strong>Reason:</strong> {app.reason}
              </p>

              <div className="mt-3">

                <span
                  className={`${statusColor(
                    app.status
                  )} text-white px-3 py-1 rounded-full text-sm`}
                >
                  {app.status}
                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex items-center">

              {app.status === "pending" && (
                <div className="space-x-2">

                  <button
                    onClick={() =>
                      updateStatus(
                        app._id,
                        "approved"
                      )
                    }
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      cancelAppointment(app._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>
              )}

              {app.status === "approved" && (
                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      "completed"
                    )
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Complete
                </button>
              )}

              {app.status === "completed" && (
                <span className="text-green-600 font-bold">
                  ✔ Completed
                </span>
              )}

              {app.status === "cancelled" && (
                <span className="text-red-600 font-bold">
                  ✖ Cancelled
                </span>
              )}

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default DoctorDashboard;