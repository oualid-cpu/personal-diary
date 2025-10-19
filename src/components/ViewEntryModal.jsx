export default function ViewEntryModal({ entry, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-5xl flex flex-col md:flex-row gap-6">
        
        {/* Left: Image Gallery */}
        <div className="md:w-1/2 flex flex-col gap-3 overflow-y-auto max-h-[80vh]">
          {entry.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Entry image ${i + 1}`}
              className="rounded-lg w-full object-cover"
            />
          ))}
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{entry.title}</h2>
            <p className="text-gray-500 mb-4">{entry.date}</p>
            <p className="text-gray-700 leading-relaxed">{entry.content}</p>
          </div>
          <button
            className="mt-6 self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
