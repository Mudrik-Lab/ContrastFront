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

  const { data, isSuccess, refetch } = useQuery({
    queryKey: [`submitted_study`, id],
    queryFn: () => getStudy({ id }),
  });

  const handleRefetch = () => {
    console.log("i did refetch");
    refetch();
  };
  const study = data?.data;
  const headlineLenghtToShow = 40; //chars
  const statusNumber = { onProccess: 0, approved: 1, rejected: 2 };
  let status = "";

  status =
    study?.approval_status === statusNumber.approved
      ? "Approved"
      : study?.approval_status === statusNumber.rejected
      ? "Rejected"
      : study?.approval_status === statusNumber.onProccess
      ? "Uncompleted submissions"
      : "Awaiting Review";
  return (
    <div className="px-2 h-full">
      {
        // for case of watching paper (no edit)
        isSuccess &&
          (!showEditble ||
            study.approval_status !== statusNumber.onProccess) && (
            <div>
              <ProgressComponent
                status={status}
                paperNmae={study.title.slice(0, headlineLenghtToShow) + "..."}
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
                    refetch={handleRefetch}
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
          )
      }
      {
        // in case of opening the paper to edit
        isSuccess &&
          study.approval_status === statusNumber.onProccess &&
          showEditble && (
            <UncompletedPaper
              refetch={handleRefetch}
              showEditble={showEditble}
              study={study}
              paperToShow={paperToShow}
              setPaperToShow={setPaperToShow}
            />
          )
      }
    </div>
  );
}
