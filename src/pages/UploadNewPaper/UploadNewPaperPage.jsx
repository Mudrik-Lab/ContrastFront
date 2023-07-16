import { useNavigate } from "react-router-dom";
import {
  Button,
  FilterExplanation,
  SideControl,
  Spacer,
  TopSideUserBox,
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

export default function UploadNewPaper() {
  const [paperToShow, setPaperToShow] = useState();
  const [addNewPaper, setAddNewPaper] = useState(false);

  const navigate = useNavigate();
  const pageName = "upload-new-paper";
  const snap = useSnapshot(state);

  const { data, isSuccess } = useQuery(
    ["submitted_studies"],
    getMySubmittedStudies
  );
  return (
    <div className="h-full">
      {isSuccess && (
        <PageTemplate
          control={
            <div>
              <SideControl isUploadPaper headline={<TopSideUserBox />}>
                <SideStatus
                  status={"Complete"}
                  completedStudy
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter((paper) => paper.approval_status == 1)
                      .length
                  }
                  papers={[
                    ...data.data.filter((paper) => paper.approval_status == 1),
                  ]}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <FilterExplanation
                    tooltip={"Papers we approved"}
                    text={"Your approved papers"}
                  />
                </div>
                <SideStatus
                  status={"Rejected"}
                  completedStudy
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter((paper) => paper.approval_status == 2)
                      .length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == 2
                  )}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <FilterExplanation
                    tooltip={"Papers we approved"}
                    text={"Your approved papers"}
                  />
                </div>

                <SideStatus
                  status={"Awaiting Review"}
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter((paper) => paper.approval_status == 3)
                      .length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == 3
                  )}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <FilterExplanation
                    tooltip={"Papers we aprroved"}
                    text={"Papers you’ve submitted for review"}
                  />
                </div>

                <SideStatus
                  status={"Uncompleted submissions"}
                  setPaperToShow={setPaperToShow}
                  number={
                    data.data.filter((paper) => paper.approval_status == 0)
                      .length
                  }
                  papers={data.data.filter(
                    (paper) => paper.approval_status == 0
                  )}
                />
                <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                  <FilterExplanation
                    tooltip={"Papers we aprroved"}
                    text={"Papers still in process of submission"}
                  />
                </div>

                <div className="flex flex-col items-center w-full">
                  <Spacer height={30} />

                  <Button
                    onClick={() => setAddNewPaper(true)}
                    disabled={addNewPaper}
                    extraClass="mx-auto font-normal">
                    <AddPaper /> Add new paper
                  </Button>
                </div>
              </SideControl>
            </div>
          }
          graph={
            <div className="overflow-x-scroll h-full">
              {addNewPaper ? (
                <NewPaperForm />
              ) : (
                paperToShow && <PaperSection paperId={paperToShow} />
              )}
            </div>
          }
        />
      )}
    </div>
  );
}
