import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [stats, setStats] = useState({ total: 0, active: 0, departments: 0, avgSalary: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/api/employees")
      .then(res => {
        const employees = res.data;
        const active = employees.filter(e => e.status === "Active").length;
        const departments = [...new Set(employees.map(e => e.department))].length;
        const avgSalary = employees.length
          ? Math.round(employees.reduce((s, e) => s + Number(e.salary), 0) / employees.length)
          : 0;
        setStats({ total: employees.length, active, departments, avgSalary });
      })
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Total Employees", value: stats.total, color: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700" },
    { label: "Active Employees", value: stats.active, color: "border-green-500", bg: "bg-green-50", text: "text-green-700" },
    { label: "Departments", value: stats.departments, color: "border-orange-500", bg: "bg-orange-50", text: "text-orange-700" },
    { label: "Avg. Salary", value: `₹${stats.avgSalary.toLocaleString()}`, color: "border-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((card, i) => (
          <div key={i} className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${card.color} text-center`}>
            <h3 className={`text-3xl font-bold mb-1 ${card.text}`}>{card.value}</h3>
            <p className="text-gray-500 text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Welcome to HR Management System</h2>
        <p className="text-gray-500 leading-relaxed">
          Manage your employees efficiently. Use the navigation above to view all employees,
          add new ones, or update existing records.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;