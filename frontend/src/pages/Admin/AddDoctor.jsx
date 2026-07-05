import { useState } from "react";
import api from "../../services/api";

function AdminAddDoctor({ onDoctorAdded }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    experience: "",
    fee: "",
    phone: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", form.name);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("specialization", form.specialization);
    data.append("experience", form.experience);
    data.append("fee", form.fee);
    data.append("phone", form.phone);
    data.append("image", image);

    try {
      await api.post("/admin/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Doctor added successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        experience: "",
        fee: "",
        phone: "",
      });

      setImage(null);

      onDoctorAdded && onDoctorAdded();
    } catch (error) {
      console.log(error);
      alert("Failed to add doctor");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        <input name="specialization" placeholder="Specialization" onChange={handleChange} className="border p-2 w-full" />
        <input 
            type="number" 
            name="experience" 
            placeholder="Experience (in years, e.g., 5)" 
            onChange={handleChange} 
            className="border p-2 w-full" 
          />
        <input name="fee" placeholder="Fee" onChange={handleChange} className="border p-2 w-full" />
        <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 w-full" />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2 w-full">
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AdminAddDoctor;