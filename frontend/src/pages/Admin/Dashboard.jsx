import { useEffect, useState } from "react";
import api from "../../services/api";
import AddDoctor from "./AddDoctor"; 

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL DATA
  const fetchData = async () => {
    try {
      // Axios interceptor automatically passes the authorization headers
      const [usersRes, doctorsRes, appRes] = await Promise.all([
        api.get("/admin/users"),
        api.get("/admin/doctors"),
        api.get("/admin/appointments"),
      ]);

      setUsers(usersRes.data.users);
      setDoctors(doctorsRes.data.doctors);
      setAppointments(appRes.data.appointments);
    } catch (error) {
      console.error("Dashboard fetching error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE USER 
  const handleDeleteUser = async (id) => {
    const confirm = window.confirm("Delete this user?");

    if (!confirm) return;

    try {
      await api.delete(`/admin/users/${id}`);
      fetchData(); 
    } catch (error) {
      console.error("Delete user error:", error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-lg font-medium text-gray-600 animate-pulse">
          Loading Admin Dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* ADD DOCTOR FORM COMPONENT */}
        <AddDoctor onDoctorAdded={fetchData} />

        {/* ================= STATS CARD GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Users</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">{users.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Doctors</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">{doctors.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Appointments</h2>
            <p className="text-3xl font-bold text-gray-800 mt-1">{appointments.length}</p>
          </div>
        </div>

        {/* ================= USERS SECTION ================= */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            System Users
          </h2>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-2">
            {users.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">No system users found.</p>
            ) : (
              users.map((user) => (
                <div key={user._id} className="flex justify-between items-center py-3">
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full capitalize">
                      {user.role}
                    </span>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium px-3 py-1 rounded transition shadow-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= DOCTORS SECTION ================= */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            Registered Doctors
          </h2>
          <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto pr-2">
            {doctors.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">No doctors registered yet.</p>
            ) : (
              doctors.map((doc) => (
                <div key={doc._id} className="flex justify-between items-center py-3">
                  <div>
                    <p className="font-semibold text-gray-800">Dr. {doc.name}</p>
                    <p className="text-gray-500 text-sm">{doc.email}</p>
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    {doc.specialization || "General Physician"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ================= APPOINTMENTS SECTION ================= */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
            Global Appointment Logs
          </h2>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto pr-2">
            {appointments.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">No system appointments recorded.</p>
            ) : (
              appointments.map((app) => (
                <div key={app._id} className="py-3.5 space-y-1">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-800">Patient:</strong> {app.patient?.name || "Deleted User"}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong className="text-gray-800">Doctor:</strong> Dr. {app.doctor?.name || "Deleted User"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-600">📅 {app.date} | ⏰ {app.time}</p>
                      <p className="text-xs font-semibold capitalize mt-1">
                        Status: <span className={
                          app.status === 'approved' ? 'text-emerald-600' :
                          app.status === 'completed' ? 'text-blue-600' :
                          app.status === 'cancelled' ? 'text-rose-600' : 'text-amber-600'
                        }>{app.status}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;