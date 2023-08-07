import React, { useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { Spacer, Text } from "../../components/Reusble";
import ExperimentsBox from "./ExperimentsBox";
import { countries } from "countries-list";

import { getStudy } from "../../apiHooks/getStudies";
import { useQuery } from "@tanstack/react-query";
import ExperimentDetails from "./ExperimentsSection/ExperimentDetails";
import UncompletedPaper from "./UncompletedPaper";
import { statusNumber } from "../../Utils/HardCoded";

export default function PaperSection({
  paperId,
  showEditble,
  setNewPaper,
  setAddNewPaper,
  setShowEditble,
}) {
  const [paperToShow, setPaperToShow] = useState();
  const [paperToEdit, setPaperToEdit] = useState();

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

  let status = "";

  status =
    study?.approval_status === statusNumber.APPROVED
      ? "Approved"
      : study?.approval_status === statusNumber.REJECTED
      ? "Rejected"
      : study?.approval_status === statusNumber.ON_PROCCESS
      ? "Uncompleted submissions"
      : "Awaiting Review";

  return (
    <div className="px-2 h-full">
      {
        // for case of watching paper (no edit)
        isSuccess &&
          (!showEditble ||
            study.approval_status !== statusNumber.ON_PROCCESS) && (
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
                    showEditble={false}
                    refetch={handleRefetch}
                    setPaperToShow={setPaperToShow}
                    setPaperToEdit={setPaperToEdit}
                    experiments={study.experiments.map((experiment, index) => ({
                      ...experiment,
                      title: `Experiment #${index + 1}`,
                    }))}
                  />
                  <Spacer height={20} />
                </div>
                {paperToShow && (
                  <ExperimentDetails
                    setPaperToShow={setPaperToShow}
                    experiment={paperToShow}
                    study={study}
                  />
                )}
              </div>
            </div>
          )
      }
      {
        // in case of opening the paper to edit
        isSuccess &&
          study.approval_status === statusNumber.ON_PROCCESS &&
          showEditble && (
            <UncompletedPaper
              setAddNewPaper={setAddNewPaper}
              refetch={handleRefetch}
              showEditble={showEditble}
              study={study}
              setNewPaper={setNewPaper}
              setShowEditble={setShowEditble}
              paperToShow={paperToShow}
              setPaperToShow={setPaperToShow}
              paperToEdit={paperToEdit}
              setPaperToEdit={setPaperToEdit}
            />
          )
      }
    </div>
  );
}
