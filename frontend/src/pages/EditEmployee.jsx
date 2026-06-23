import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";
const DEPARTMENTS = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "", position: "", salary: "", status: "Active" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/employees/${id}`)
      .then(res => { setForm(res.data); setLoading(false); })
      .catch(() => { setMsg({ text: "Could not load employee.", type: "error" }); setLoading(false); });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`${API_BASE}/employees/${id}`, form)
      .then(() => {
        setMsg({ text: "Employee updated successfully!", type: "success" });
        setTimeout(() => navigate("/employees"), 1500);
      })
      .catch(() => setMsg({ text: "Error updating employee.", type: "error" }));
  };

  const inputClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 transition";
  const labelClass = "block text-sm font-semibold text-gray-600 mb-1";

  if (loading) return <div className="text-center py-20 text-gray-400 text-lg">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Edit Employee</h1>

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
              <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Phone</label>
              <input name="phone" value={form.phone || ""} onChange={handleChange} className={inputClass} />
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
              <input name="position" value={form.position} onChange={handleChange} required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Salary (₹) *</label>
              <input name="salary" type="number" value={form.salary} onChange={handleChange} required className={inputClass} />
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
              Update Employee
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

export default EditEmployee;