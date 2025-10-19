import { useState, useRef } from "react";

export default function EntryCard({ entry }) {
  const { date = "", images = [], title = "", content = "" } = entry || {};
  const [hovered, setHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [expandDirection, setExpandDirection] = useState("right");
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      if (rect.right + 320 > windowWidth) setExpandDirection("left");
      else setExpandDirection("right");
    }
    setHovered(true);
  };

  const handleMouseLeave = () => setHovered(false);
  const handleNext = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };
  const handlePrev = (e) => {
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer rounded-[16px] overflow-hidden transition-all duration-700 ease-in-out ${
        hovered ? "z-30 scale-[1.03]" : "z-0"
      }`}
      style={{
        fontFamily: "Apple Chancery, cursive",
        width: hovered ? "680px" : "300px",
        height: hovered ? "380px" : "480px",
        border: "5px solid",
        borderColor: hovered ? "#f0b800" : "#12b886",
        boxShadow: hovered
          ? "0 0 35px rgba(240,184,0,0.4), 0 10px 30px rgba(0,0,0,0.25)"
          : "0 5px 15px rgba(0,0,0,0.15)",
        background: hovered
          ? "linear-gradient(to right, #f5eac6 0%, #fdf8e1 50%, #f5eac6 100%)"
          : "#fdf8e1",
        display: "flex",
        flexDirection: hovered ? "row" : "column",
        position: "relative",
        left: hovered && expandDirection === "left" ? "-300px" : "0",
        transition: "all 0.7s ease",
      }}
    >
      {/* ✨ Center Spine Shadow (only when hovered) */}
      {hovered && (
        <div
          className="absolute inset-y-0 left-1/2 w-[6px] z-10"
          style={{
            transform: "translateX(-50%)",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
            boxShadow: "inset 0 0 12px rgba(0,0,0,0.5)",
            borderRadius: "2px",
          }}
        />
      )}

      {/* --- LEFT PAGE (Images) --- */}
      <div
        className={`relative transition-all duration-700 ease-in-out ${
          hovered ? "w-1/2 h-full" : "w-full h-[250px]"
        } overflow-hidden`}
        style={{
          background: hovered
            ? "repeating-linear-gradient(#f4e6b3 0px, #f4e6b3 25px, #f0e2aa 26px)"
            : "#f4e6b3",
          boxShadow: hovered
            ? "inset -5px 0 10px rgba(0,0,0,0.15)"
            : "inset 0 -2px 8px rgba(0,0,0,0.1)",
        }}
      >
        {images.length > 0 ? (
          <img
            src={images[imageIndex]}
            alt={title}
            className="w-full h-full object-cover brightness-[0.95] transition-transform duration-700"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              mixBlendMode: "multiply",
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-600 italic">
            No image
          </div>
        )}

        {/* image controls */}
        {hovered && images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={handlePrev}
              className="bg-[#12b886] text-white px-3 py-1 rounded-full shadow-md hover:bg-[#0fa67b] transition"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="bg-[#12b886] text-white px-3 py-1 rounded-full shadow-md hover:bg-[#0fa67b] transition"
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* --- RIGHT PAGE (Text) --- */}
      {hovered ? (
        <div
          className="w-1/2 h-full flex flex-col p-6 overflow-hidden"
          style={{
            background:
              "repeating-linear-gradient(#fffbe8 0px, #fffbe8 24px, #f8f0c8 25px)",
            boxShadow: "inset 5px 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <p className="text-gray-600 text-sm text-center italic mb-2">
            {date}
          </p>
          <h3
            className="text-2xl text-center mb-3"
            style={{
              color: "#12b886",
              textShadow: "0 0 6px rgba(18,184,134,0.3)",
            }}
          >
            {title || "Untitled"}
          </h3>
          <div
            className="flex-1 overflow-y-auto text-gray-800 text-sm text-justify leading-relaxed pr-2"
            style={{
              fontFamily: "Cormorant Garamond, serif",
              scrollbarColor: "#12b886 #fffbe8",
            }}
          >
            {content ||
              "No content yet — your thoughts will appear here like ink on parchment."}
          </div>
        </div>
      ) : (
        <>
          {/* --- Closed Card Layout --- */}
          <div className="pt-3 pb-2 text-center text-gray-700 font-medium text-base italic">
            {date}
          </div>
          <div className="h-[250px] w-full overflow-hidden">
            {images.length > 0 ? (
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover brightness-[0.9]"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-600 italic bg-[#f4e6b3]">
                No image
              </div>
            )}
          </div>
          <div className="p-4 flex-1 flex flex-col bg-[#fffbe8]/50">
            <h3 className="text-xl text-center text-[#12b886] mb-2">
              {title || "Untitled"}
            </h3>
            <p className="text-gray-700 text-sm text-justify leading-relaxed">
              {content && content.length > 100
                ? content.slice(0, 100) + "..."
                : content || "Your story awaits..."}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
