import React from "react";
import Navbar from "../../components/Navbar";
import { Spacer, Text } from "../../components/Reusble";
import { navHeight } from "../../Utils/HardCoded";
import Spinner from "../../components/Spinner";

export default function UploadNewPaper() {
  return (
    <div>
      <Navbar />
      <Spacer height={navHeight + 64} />
      <div className="px-56">
        <Spinner />
      </div>
    </div>
  );
}
