import { Link } from "react-router-dom";

export default function Header({ onAddClick, onSearchChange }) {
  return (
    <header className="w-full bg-[#12b886] shadow">
      <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 focus:outline-none rounded">
            <img
              src="/logo1.png"
              alt="Diary Logo"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#343a40]"
            />
          </Link>
        </div>

        {/* Middle: Search Bar */}
        <div className="w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full bg-white text-[#343a40] placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-300 outline-none focus:border-[#343a40] focus:ring-1 focus:ring-[#343a40] transition"
          />
        </div>

        {/* Right: Navigation */}
        <div className="flex items-center justify-end space-x-4">
          <Link
            to="/"
            className="bg-[#343a40] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2e3238] transition"
          >
            My Diary
          </Link>

          <Link
            to="/CreateDiary"
            className="bg-[#f08c00] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d97706] transition"
          >
            Create Diary
          </Link>
        </div>
      </div>
    </header>
  );
}
