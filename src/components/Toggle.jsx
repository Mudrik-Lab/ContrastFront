import React from "react";

export default function Toggle({ checked, setChecked }) {
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <label class="relative inline-flex items-center mr-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        class="sr-only peer"
        checked={checked}
        onChange={handleClick}
      />
      <div class="w-11 h-6 bg-blue rounded-full   peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue"></div>
    </label>
  );
}
