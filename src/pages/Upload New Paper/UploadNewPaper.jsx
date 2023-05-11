import React from "react";
import Navbar from "../../components/Navbar";
import { Spacer, Text } from "../../components/Reusble";
import { colorsArray, navHeight } from "../../components/HardCoded";
import Spinner from "../../components/Spinner";

export default function UploadNewPaper() {
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="px-56">
        <Spinner />
        {/* <Text size={57} color="blue" center>
          Upload New Paper
        </Text>
        {colorsArray.map((color, index) => (
          <div className="w-5 h-5 m-2 " style={{ backgroundColor: color }}>
            {index}
          </div>
        ))} */}
      </div>
    </div>
  );
}
