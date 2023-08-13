import { useNavigate } from "react-router-dom";
import {
  Button,
  TooltipExplanation,
  SideControl,
  Spacer,
  TopSideUserBox,
  Text,
} from "../../components/Reusble";
import PageTemplate from "../../components/PageTemplate";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import SideStatus from "../../components/SideStatus";
import { useQuery } from "@tanstack/react-query";
import { getMySubmittedStudies } from "../../apiHooks/getStudies";
import PaperSection from "./PaperSection";
import React, { useState } from "react";
import { ReactComponent as AddPaper } from "../../assets/icons/add-paper-icon.svg";
import NewPaperForm from "./NewPaperForm";
import {
  statusNumber,
  upladPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../Utils/HardCoded";

export default function UploadNewPaper() {
  const [paperToShow, setPaperToShow] = useState();
  const [showEditble, setShowEditble] = useState(false);
  const [addNewPaper, setAddNewPaper] = useState(false);
  const [newPaper, setNewPaper] = useState(false);
  const [addNewExperiment, setAddNewExperiment] = useState(false);

  const { data, isSuccess, refetch } = useQuery(
    ["submitted_studies"],
    getMySubmittedStudies
  );

  const handleRefetch = () => {
    console.log("did refetch");
    refetch();
  };
  return (
    <div className="h-full">
      {isSuccess && (
        <PageTemplate
          control={
            <div className="relative p-2 ">
              <TopSideUserBox />
              {addNewPaper && (
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 z-20"></div>
              )}
              <div
                className="p-4 shadow-3xl mt-2 overflow-y-scroll"
                style={{
                  height: `calc(100vh - ${
                    uploadPaperUsedHeight + upladPaperPageTopSection
                  }px)`,
                }}>
                <Text weight={"bold"} color={"grayHeavy"}>
                  My Papers
                </Text>
                <Spacer height={20} />
                <SideStatus
                  status={"Complete"}
                  completedStudy
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter(
                      (paper) => paper.approval_status == statusNumber.APPROVED
                    ).length
                  }
                  papers={[
                    ...data.data.filter(
                      (paper) => paper.approval_status == statusNumber.APPROVED
                    ),
                  ]}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <TooltipExplanation
                    text={"Papers we approved"}
                    tooltip={"View completed submissions to check their status"}
                  />
                </div>
                <SideStatus
                  status={"Rejected"}
                  completedStudy
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter(
                      (paper) => paper.approval_status == statusNumber.REJECTED
                    ).length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == statusNumber.REJECTED
                  )}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <TooltipExplanation
                    text={"Your rejected papers"}
                    tooltip={"Your rejected papers"}
                  />
                </div>

                <SideStatus
                  status={"Awaiting Review"}
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter(
                      (paper) => paper.approval_status == statusNumber.AWAITING
                    ).length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == statusNumber.AWAITING
                  )}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <TooltipExplanation
                    text={"Awaiting"}
                    tooltip={"View submissions awaiting review"}
                  />
                </div>

                <SideStatus
                  refetch={handleRefetch}
                  status={"Uncompleted submissions"}
                  setPaperToShow={setPaperToShow}
                  setShowEditble={setShowEditble}
                  showEditble={true}
                  number={
                    data.data.filter(
                      (paper) =>
                        paper.approval_status == statusNumber.ON_PROCCESS
                    ).length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == statusNumber.ON_PROCCESS
                  )}
                  addNew={() => setAddNewPaper(true)}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <TooltipExplanation
                    text={"Uncompleted submissions"}
                    tooltip={"View submissions in progress and complete them!"}
                  />
                </div>

                <div className="flex flex-col items-center w-full ">
                  <Spacer height={30} />

                  <Button
                    onClick={() => setAddNewPaper(true)}
                    disabled={addNewPaper}
                    extraClass="mx-auto font-normal ">
                    <AddPaper /> Add new paper
                  </Button>
                </div>
              </div>
            </div>
          }
          graph={
            <div
              className=" shadow-3xl mt-2 overflow-y-scroll h-full"
              style={{
                height: `calc(100vh - ${uploadPaperUsedHeight + 10}px)`,
              }}>
              {addNewPaper ? (
                <NewPaperForm
                  setAddNewPaper={setAddNewPaper}
                  refetch={handleRefetch}
                  setNewPaper={setNewPaper}
                  addNewExperiment={addNewExperiment}
                  setAddNewExperiment={setAddNewExperiment}
                />
              ) : (
                paperToShow && (
                  <PaperSection
                    newPaper={newPaper}
                    setNewPaper={setNewPaper}
                    setAddNewPaper={setAddNewPaper}
                    showEditble={showEditble}
                    setShowEditble={setShowEditble}
                    paperId={paperToShow}
                    addNewExperiment={addNewExperiment}
                    setAddNewExperiment={setAddNewExperiment}
                  />
                )
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
