import { Routes, Route } from 'react-router-dom';

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Doctors from "./pages/Doctors/Doctors";
import BookAppointment from "./pages/Appointment/BookAppointment";
import PatientDashboard from "./pages/Patient/Dashboard";
import DoctorDashboard from "./pages/Doctor/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import MainLayout from "./layouts/MainLayout";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import AddDoctor from "./pages/Admin/AddDoctor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/book/:doctorId" element={<BookAppointment />} />
        <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute allowedRoles={["doctor"]}>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin/add-doctor"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddDoctor />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;