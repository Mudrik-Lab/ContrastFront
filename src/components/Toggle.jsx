import classNames from "classnames";
import React from "react";

export default function Toggle({ checked, setChecked, disabled }) {
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <label className="relative inline-flex items-center mx-2 cursor-pointer">
      <input
        disabled={disabled}
        aria-label="toggle input"
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={handleClick}
      />
      <div
        className={classNames(
          `w-11 h-6 ${
            disabled ? "bg-grayReg" : "bg-blue"
          } rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue `
        )}></div>
    </label>
  );
}
