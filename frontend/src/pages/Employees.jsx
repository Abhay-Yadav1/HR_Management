import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_BASE from "../api";
function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const fetchEmployees = () => {
    axios.get(`${API_BASE}/employees`)
      .then(res => { setEmployees(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    axios.delete(`${API_BASE}/employees/${id}`)
      .then(() => {
        setMsg("Employee deleted successfully.");
        fetchEmployees();
        setTimeout(() => setMsg(""), 3000);
      })
      .catch(() => setMsg("Error deleting employee."));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">All Employees</h1>
        <Link to="/add-employee">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition">
            + Add Employee
          </button>
        </Link>
      </div>

      {msg && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
          {msg}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading employees...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                {["#", "Name", "Email", "Department", "Position", "Salary", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-sm font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-400">
                    No employees found. Add one!
                  </td>
                </tr>
              ) : (
                employees.map((emp, i) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{emp.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.position}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">₹{Number(emp.salary).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link to={`/edit-employee/${emp.id}`}>
                          <button className="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Employees;