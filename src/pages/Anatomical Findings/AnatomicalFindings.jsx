import React from "react";
import PageTemplate from "../../components/PageTemplate";
import getConfiguration from "../../apiHooks/getConfiguration";
import { useQuery } from "@tanstack/react-query";
import { screenHeight } from "../../Utils/HardCoded";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Spacer, TopGraphText, Text } from "../../components/Reusble";
import { graphsHeaders } from "../../Utils/GraphsDetails";
import Spinner from "../../components/Spinner";

export default function AnatomicalFindings() {
  const { data, isSuccess, isLoading } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const pic = data?.data.images[0].image;
  return (
    <div>
      <Navbar />
      <Spacer height={80} />
      {isSuccess && (
        <div className="h-auto w-full">
          <TopGraphText
            text={graphsHeaders[8].figureText}
            firstLine={graphsHeaders[8].figureLine}
            legendLine={graphsHeaders[8].legendLine}
          />
          <Spacer height={50} />
          <Text size={28} weight="bold" color="blue" center>
            Anatomical Findings
          </Text>
          <Spacer height={50} />

          {isLoading ? (
            <Spinner />
          ) : (
            <img src={pic} width={"85%"} className="mx-auto" />
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}
