import React from "react";
import getConfiguration from "../../../apiHooks/getConfiguration";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../../../sharedComponents/Navbar";
import Footer from "../../../sharedComponents/Footer";
import { Spacer, TopGraphText, Text } from "../../../sharedComponents/Reusble";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import Spinner from "../../../sharedComponents/Spinner";

export default function AnatomicalFindings() {
  const { data, isSuccess, isLoading } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const pic = data?.data.images[0].image;
  return (
    <div className="relative">
      <Navbar />
      <Spacer height={80} />
      {isSuccess && (
        <div className="h-auto w-full ">
          <TopGraphText
            text={graphsHeaders["AnatomicalFindings"].figureText}
            firstLine={graphsHeaders["AnatomicalFindings"].figureLine}
            legendLine={graphsHeaders["AnatomicalFindings"].legendLine}
          />
          <Spacer height={50} />
          <Text xl3 weight="bold" color="blue" center>
            Anatomical Findings
          </Text>
          <Spacer height={50} />

          {isLoading ? (
            <Spinner />
          ) : (
            <div className="w-full flex justify-center items-center">
              <img
                width={"80%"}
                src={pic}
                alt="Anatomical findings graph"
                className="max-h-full my-0 mx-auto"
              />
            </div>
          )}
        </div>
      )}
      <Footer isFixed />
    </div>
  );
}
