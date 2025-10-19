import React, { useState } from "react";
import Header from "../components/Header";
import EntryCard from "../components/EntryCard";

export default function CreateDiary() {
  // Form states
  const [imageURL, setImageURL] = useState("");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  // Handle upload
  const handleUpload = () => {
    if (imageURL.trim() !== "") {
      setImages((prev) => [...prev, imageURL]);
      setImageURL("");
      if (!mainImage) setMainImage(imageURL); // first uploaded becomes default main
    }
  };

  // Handle saving
  const handleSave = () => {
    if (!date || !title || !content || images.length === 0) {
      alert("⚠️ Please fill out all fields and upload at least one image!");
      return;
    }

    const newEntry = {
      date,
      title,
      content,
      images,
      mainImage, // store the selected main image
    };

    const existing = JSON.parse(localStorage.getItem("entries")) || [];
    const updated = [newEntry, ...existing];
    localStorage.setItem("entries", JSON.stringify(updated));

    alert("✅ Diary entry saved successfully!");

    // Reset form
    setDate("");
    setTitle("");
    setContent("");
    setImages([]);
    setMainImage(null);
  };

  // For live preview (card)
  const previewEntry = {
    date,
    title,
    content,
    images: mainImage
      ? [mainImage, ...images.filter((img) => img !== mainImage)]
      : images,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-col items-center p-8 gap-10">
        {/* Form + Live Preview */}
        <div className="flex w-full max-w-6xl justify-between gap-10">
          {/* ---------- LEFT: FORM ---------- */}
          <div className="flex-1 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
            <h2
              className="text-2xl font-semibold mb-4 text-gray-800 text-center"
              style={{ fontFamily: "Apple Chancery, cursive" }}
            >
              Create a New Diary Entry
            </h2>

            {/* Image URL + Upload */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                placeholder="Enter Image URL..."
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]"
              />
              <button
                onClick={handleUpload}
                className="bg-[#12b886] hover:bg-[#f08c00] text-white px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Upload
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`img-${idx}`}
                      className={`h-24 w-24 object-cover rounded-lg border-2 ${
                        mainImage === img
                          ? "border-[#12b886]"
                          : "border-gray-300"
                      }`}
                    />
                    {/* Set as main button */}
                    <button
                      onClick={() => setMainImage(img)}
                      className="absolute inset-0 bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 text-xs font-semibold rounded-lg transition flex items-center justify-center"
                    >
                      {mainImage === img ? "Main Image" : "Set as Main"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Date */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]"
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title..."
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12b886]"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-1">Description:</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your diary entry..."
                rows="6"
                className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#12b886]"
              ></textarea>
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSave}
                className="bg-[#12b886] hover:bg-[#f08c00] text-white font-medium px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Save Diary
              </button>
            </div>
          </div>

          {/* ---------- RIGHT: LIVE PREVIEW CARD ---------- */}
          <div className="flex-1 flex justify-center items-start">
            <EntryCard entry={previewEntry} />
          </div>
        </div>
      </div>
    </div>
  );
}
