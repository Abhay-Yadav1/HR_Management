import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";
const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
const emptyForm = { name: "", email: "", phone: "", department: "", position: "", salary: "", status: "Active" };

function AddEmployee() {
  const [form, setForm] = useState(emptyForm);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE}/employees`, form)
      .then(() => {
        setMsg({ text: "Employee added successfully!", type: "success" });
        setForm(emptyForm);
        setTimeout(() => navigate("/employees"), 1500);
      })
      .catch(() => setMsg({ text: "Error adding employee. Please try again.", type: "error" }));
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1";

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Add New Employee</h1>

      {msg.text && (
        <div className={`px-4 py-3 rounded-lg mb-5 text-sm font-medium ${
          msg.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {msg.text}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="rahul@company.com" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Department *</label>
              <select name="department" value={form.department} onChange={handleChange} required className={inputClass}>
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Position *</label>
              <input name="position" value={form.position} onChange={handleChange} placeholder="e.g. Software Engineer" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Salary (₹) *</label>
              <input name="salary" type="number" value={form.salary} onChange={handleChange} placeholder="e.g. 50000" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-7">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition">
              Add Employee
            </button>
            <button type="button" onClick={() => navigate("/employees")} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;