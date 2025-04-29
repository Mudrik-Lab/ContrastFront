import { useState } from "react";
import { CreateScale } from "../Utils/functions";

export default function Scale({ color_list }) {
  const [hoveredValue, setHoveredValue] = useState(null);
  const gradientColors = CreateScale(color_list);
  const gradientStyle = {
    background: `linear-gradient(to bottom,${gradientColors})`,
    position: "relative",
    width: "30px",
    borderRadius: "2px",
    border: "1px solid black",
  };

  // Marks on the side of the gradient
  const marks = [
    { value: "1", position: "0.25%" },
    { value: "0.75", position: "25%" },
    { value: "0.5", position: "50%" },
    { value: "0.25", position: "75%" },
    { value: "0", position: "99.5%" },
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = (1 - y / rect.height).toFixed(2);
    setHoveredValue(percentage);
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
  };

  return (
    <div className="flex items-center justify-center h-1/2">
      <div className="relative flex h-full ">
        <div
          style={gradientStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded h-full"
        />

        {/* Markers with Tailwind classes */}
        <div className="relative h-full ">
          {marks.map((mark, index) => (
            <div
              key={index}
              className="absolute flex items-center"
              style={{ top: mark.position, transform: "translateY(-50%)" }}>
              <div className="w-2 h-[0.25px] bg-black"></div>
              <span className="ml-1 text-xs text-black">{mark.value}</span>
            </div>
          ))}
        </div>

        {/* Value tooltip with Tailwind classes */}
        {hoveredValue && (
          <div
            className="absolute -left-16 bg-gray-800 text-white px-2 py-1 text-xs rounded"
            style={{
              top: `${(1 - parseFloat(hoveredValue)) * 100}%`,
              transform: "translateY(-50%)",
            }}>
            Value: {hoveredValue}
          </div>
        )}
      </div>
    </div>
  );
}
