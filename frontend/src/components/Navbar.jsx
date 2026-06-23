import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-600 px-8 h-16 flex items-center justify-between shadow-lg">
      <Link to="/" className="text-white text-xl font-bold tracking-wide">
        🏢 HR Management
      </Link>
      <ul className="flex gap-1 list-none items-center">
        <li>
          <Link to="/" className="text-blue-100 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/employees" className="text-blue-100 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">
            Employees
          </Link>
        </li>
        <li>
          <Link to="/departments" className="text-blue-100 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">
            Departments
          </Link>
        </li>
        <li>
          <Link to="/attendance" className="text-blue-100 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">
            Attendance
          </Link>
        </li>
        <li>
          <Link to="/add-employee" className="text-blue-100 hover:text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition">
            + Add Employee
          </Link>
        </li>
        <li>
          <button
            onClick={onLogout}
            className="ml-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;