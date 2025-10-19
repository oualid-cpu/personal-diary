import EntryCard from "./EntryCard";

export default function EntryList({ entries, onCardClick }) {
  if (!entries.length)
    return (
      <p className="text-center text-gray-500 mt-20">
        No diary entries yet. Click “Create Diary” to add one.
      </p>
    );

  const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {sorted.map((entry, index) => (
        <EntryCard key={index} entry={entry} onClick={() => onCardClick(entry)} />
      ))}
    </div>
  );
}
