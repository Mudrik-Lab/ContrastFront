import React from "react";
import getConfiguration from "../../apiHooks/getConfiguration";
import { useQuery } from "@tanstack/react-query";
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
    <div className="relative">
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
          <Text className="text-3xl" weight="bold" color="blue" center>
            Anatomical Findings
          </Text>
          <Spacer height={50} />

          {isLoading ? (
            <Spinner />
          ) : (
            <div
              style={{ height: "calc(100vh - 200px)" }}
              className=" flex justify-center items-center">
              <img
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
