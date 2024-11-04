import React from "react";

export default function SaveIcon({ disabled }) {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="saveIconTitle"
      stroke={disabled ? "#6d6d6d" : "#379EEA"}
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
      fill="none"
      color="#000000">
      <title id="saveIconTitle">Save</title>{" "}
      <path d="M17.2928932,3.29289322 L21,7 L21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 L16.5857864,3 C16.8510029,3 17.1053568,3.10535684 17.2928932,3.29289322 Z" />{" "}
      <rect width="10" height="8" x="7" y="13" />{" "}
      <rect width="8" height="5" x="8" y="3" />{" "}
    </svg>
  );
}
