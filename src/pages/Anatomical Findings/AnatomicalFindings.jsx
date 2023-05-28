import React from "react";
import PageTemplate from "../../components/PageTemplate";
import getConfiguration from "../../apiHooks/getConfiguration";
import { useQuery } from "@tanstack/react-query";
import { screenHeight } from "../../Utils/HardCoded";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Spacer } from "../../components/Reusble";

export default function AnatomicalFindings() {
  const { data, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const pic = data?.data.images[0].image;
  return (
    <div>
      <Navbar />
      <Spacer height={80} />
      {configurationSuccess && (
        <div className="h-auto w-full">
          <img src={pic} />
        </div>
      )}
      <Footer />
    </div>
  );
}
