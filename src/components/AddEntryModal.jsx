import { useState } from "react";

export default function AddEntryModal({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !date || !images || !content) {
      alert("Please fill in all fields.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      title,
      date,
      images: images.split(",").map((url) => url.trim()),
      content,
    };

    onAdd(newEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <textarea
            placeholder="Image URLs (separate by commas)"
            className="border p-2 rounded"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
          <textarea
            placeholder="Write your thoughts..."
            className="border p-2 rounded h-24"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="bg-gray-200 px-3 py-1 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
