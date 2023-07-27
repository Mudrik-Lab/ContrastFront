import React, { useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { useNavigate } from "react-router-dom";
import { Spacer, Text } from "../../components/Reusble";
import ExperimentsBox from "./ExperimentsBox";
import { countries } from "countries-list";

import { getStudy } from "../../apiHooks/getStudies";
import { useQuery } from "@tanstack/react-query";
import ExperimentDetails from "./ExperimentsSection/ExperimentDetails";
import UncompletedPaper from "./UncompletedPaper";

export default function PaperSection({ paperId, showEditble, setNewPaper }) {
  const [paperToShow, setPaperToShow] = useState();

  const id = paperId;

  const { data, isSuccess } = useQuery({
    queryKey: [`submitted_study`, id],
    queryFn: () => getStudy({ id }),
  });

  const study = data?.data;

  let status = "";
  status =
    study?.approval_status === 1
      ? "Approved"
      : study?.approval_status === 2
      ? "Rejected"
      : study?.approval_status === 0
      ? "Uncompleted submissions"
      : "Awaiting Review";
  return (
    <div className="px-2 h-full">
      {isSuccess && (!showEditble || study.approval_status !== 0) && (
        // study.approval_status !== 0 &&
        <div>
          <ProgressComponent
            status={status}
            paperNmae={study.title.slice(0, 40) + "..."}
            experiment={paperToShow?.title}
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
                    <span className="text-base" key={author.name}>
                      {author.name},{" "}
                    </span>
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
                setNewPaper={setNewPaper}
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
      {isSuccess && study.approval_status === 0 && showEditble && (
        <UncompletedPaper
          showEditble={showEditble}
          study={study}
          paperToShow={paperToShow}
          setPaperToShow={setPaperToShow}
        />
      )}
    </div>
  );
}
