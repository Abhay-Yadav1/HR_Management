import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from "../api";
const DEPT_ICONS = {
  Engineering: "💻",
  Marketing: "📣",
  Sales: "💼",
  HR: "👥",
  Finance: "💰",
  Operations: "⚙️",
};

const DEPT_COLORS = [
  "border-blue-500 bg-blue-50",
  "border-green-500 bg-green-50",
  "border-purple-500 bg-purple-50",
  "border-orange-500 bg-orange-50",
  "border-red-500 bg-red-50",
  "border-yellow-500 bg-yellow-50",
];

function Departments() {
  const [deptData, setDeptData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE}/employees`)
      .then(res => {
        const employees = res.data;

        // Group employees by department
        const grouped = {};
        employees.forEach(emp => {
          if (!grouped[emp.department]) {
            grouped[emp.department] = { total: 0, active: 0, totalSalary: 0, employees: [] };
          }
          grouped[emp.department].total += 1;
          grouped[emp.department].totalSalary += Number(emp.salary);
          grouped[emp.department].employees.push(emp);
          if (emp.status === "Active") grouped[emp.department].active += 1;
        });

        const result = Object.entries(grouped).map(([name, data]) => ({
          name,
          total: data.total,
          active: data.active,
          avgSalary: Math.round(data.totalSalary / data.total),
          employees: data.employees,
        }));

        setDeptData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400 text-lg">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Departments</h1>

      {deptData.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-400">
          No department data found. Add some employees first!
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {deptData.map((dept, i) => (
              <div key={dept.name} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${DEPT_COLORS[i % DEPT_COLORS.length]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl">{DEPT_ICONS[dept.name] || "🏢"}</p>
                    <h3 className="text-lg font-bold text-gray-800 mt-1">{dept.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-700">{dept.total}</p>
                    <p className="text-xs text-gray-400">Employees</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Active</p>
                    <p className="font-semibold text-green-600">{dept.active}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Inactive</p>
                    <p className="font-semibold text-red-500">{dept.total - dept.active}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Avg Salary</p>
                    <p className="font-semibold text-gray-700">₹{dept.avgSalary.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Department wise employee table */}
          {deptData.map((dept, i) => (
            <div key={dept.name} className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className={`px-6 py-4 flex items-center gap-2 border-b`} style={{background:'#1e3a5f'}}>
                <span className="text-xl">{DEPT_ICONS[dept.name] || "🏢"}</span>
                <h2 className="text-white font-semibold">{dept.name} Department</h2>
                <span className="ml-auto bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                  {dept.total} employees
                </span>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Email", "Position", "Salary", "Status"].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dept.employees.map(emp => (
                    <tr key={emp.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{emp.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{emp.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{emp.position}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">₹{Number(emp.salary).toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          emp.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Departments;