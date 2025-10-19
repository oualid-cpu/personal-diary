import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import EntryList from "./components/EntryList";
import AddEntryModal from "./components/AddEntryModal";
import ViewEntryModal from "./components/ViewEntryModal";
import CreateDiary from "./pages/CreateDiary";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const loadEntries = () => {
    const saved = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(saved);
  };

  // Load on first mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Reload when we come back to "/"
  useEffect(() => {
    if (location.pathname === "/") {
      loadEntries();
    }
  }, [location.pathname]);

  // Listen for our custom “entries-updated” event
  useEffect(() => {
    const handleUpdated = () => loadEntries();
    window.addEventListener("entries-updated", handleUpdated);
    return () => window.removeEventListener("entries-updated", handleUpdated);
  }, []);

  // Keep localStorage in sync when entries state changes (optional but fine)
  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
    setShowAddModal(false);
  };

  const filteredEntries = entries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Routes>
      {/* 🏠 My Diary Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50">
            <Header
              onAddClick={() => setShowAddModal(true)}
              onSearchChange={setSearchTerm}
            />

            <EntryList
              entries={filteredEntries}
              onCardClick={(entry) => {
                setSelectedEntry(entry);
                setShowViewModal(true);
              }}
            />

            {showAddModal && (
              <AddEntryModal
                onAdd={handleAddEntry}
                onClose={() => setShowAddModal(false)}
              />
            )}

            {showViewModal && selectedEntry && (
              <ViewEntryModal
                entry={selectedEntry}
                onClose={() => setShowViewModal(false)}
              />
            )}
          </div>
        }
      />

      {/* 📝 Create Diary Page */}
      <Route path="/CreateDiary" element={<CreateDiary />} />
    </Routes>
  );
}
