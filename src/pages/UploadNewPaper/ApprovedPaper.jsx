import React, { useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { useNavigate } from "react-router-dom";
import { Spacer, Text } from "../../components/Reusble";
import ExperimentsBox from "./ExperimentsBox";
import { countries } from "countries-list";

import { getStudy } from "../../apiHooks/getStudies";
import { useQuery } from "@tanstack/react-query";
import ExperimentDetails from "./ExperimentDetails";

export default function ApprovedPaper({ paperId }) {
  const [paperToShow, setPaperToShow] = useState();
  const id = paperId;
  const { data, isSuccess } = useQuery(
    [`submitted_studies-${paperId.toString()}`],
    () => getStudy({ id })
  );
  const study = data?.data;
  return (
    <div className="px-2 h-full">
      {isSuccess && (
        <div>
          <ProgressComponent
            status={"Completed"}
            paperNmae={study.title.slice(0, 25) + "..."}
          />
          <Spacer height={10} />
          <div className="flex justify-between">
            <div className="p-2 h-full w-[49%] shadow-3xl">
              <div className="flex flex-col gap-6">
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Paper Title
                  </Text>
                  <Text weight={"bold"} lg>
                    {study?.title}
                  </Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    DOI
                  </Text>
                  <Text lg>{study?.DOI}</Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Authors
                  </Text>
                  {study.authors.map((author) => (
                    <span key={author.name}>{author.name}, </span>
                  ))}
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Journals Name
                  </Text>
                  <Text lg>{study?.source_title}</Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Countries
                  </Text>
                  {study.countries.map((country) => (
                    <span key={country}>{countries[country].name}, </span>
                  ))}
                </div>
              </div>
              <Spacer height={20} />
              <ExperimentsBox
                disabled={false}
                completedStudy
                setPaperToShow={setPaperToShow}
                experiments={study.experiments.map((experiment, index) => ({
                  ...experiment,
                  title: `Experiment #${index + 1}`,
                }))}
              />
              <Spacer height={20} />
            </div>
            {paperToShow && (
              <ExperimentDetails experiment={paperToShow} study={study} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
