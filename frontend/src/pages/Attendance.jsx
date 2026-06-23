import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then(res => {
        const active = res.data.filter(e => e.status === "Active");
        setEmployees(active);
        // default everyone to Present
        const defaultAtt = {};
        active.forEach(e => { defaultAtt[e.id] = "Present"; });
        setAttendance(defaultAtt);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggle = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present",
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // In a real app you'd POST this to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = Object.values(attendance).filter(v => v === "Present").length;
  const absentCount = Object.values(attendance).filter(v => v === "Absent").length;

  if (loading) return <div className="text-center py-20 text-gray-400 text-lg">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Attendance</h1>
          <p className="text-gray-400 text-sm mt-1">{today}</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
        >
          Save Attendance
        </button>
      </div>

      {saved && (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg mb-5 text-sm font-medium">
          ✅ Attendance saved successfully for today!
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-blue-500 text-center">
          <p className="text-2xl font-bold text-blue-700">{employees.length}</p>
          <p className="text-sm text-gray-400">Total Active</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-green-500 text-center">
          <p className="text-2xl font-bold text-green-600">{presentCount}</p>
          <p className="text-sm text-gray-400">Present</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500 text-center">
          <p className="text-2xl font-bold text-red-500">{absentCount}</p>
          <p className="text-sm text-gray-400">Absent</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              {["#", "Employee Name", "Department", "Position", "Status", "Mark"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-sm font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-400">
                  No active employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp, i) => (
                <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{emp.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{emp.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{emp.position}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      attendance[emp.id] === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {attendance[emp.id]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggle(emp.id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition ${
                        attendance[emp.id] === "Present"
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-green-100 text-green-600 hover:bg-green-200"
                      }`}
                    >
                      Mark {attendance[emp.id] === "Present" ? "Absent" : "Present"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;