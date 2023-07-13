import { useNavigate } from "react-router-dom";
import {
  FilterExplanation,
  SideControl,
  TopSideUserBox,
} from "../../components/Reusble";
import PageTemplate from "../../components/PageTemplate";
import { useSnapshot } from "valtio";
import { state } from "../../state";
import SideStatus from "../../components/SideStatus";
import { useQuery } from "@tanstack/react-query";
import { getMySubmittedStudies } from "../../apiHooks/getStudies";
import NewPaperForm from "./NewPaperForm";
import ApprovedPaper from "./ApprovedPaper";
import React, { useState } from "react";

export default function UploadNewPaper() {
  const [paperToShow, setPaperToShow] = useState();

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
            <SideControl isUploadPaper headline={<TopSideUserBox />}>
              <SideStatus
                status={"Complete"}
                completedStudy
                setPaperToShow={setPaperToShow}
                number={
                  data.data.filter((paper) => paper.approval_status == 1).length
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
                  data.data.filter((paper) => paper.approval_status == 2).length
                }
                papers={data.data.filter((paper) => paper.approval_status == 2)}
              />
              <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                <FilterExplanation
                  tooltip={"Papers we approved"}
                  text={"Your approved papers"}
                />
              </div>

              <SideStatus
                status={"Awaiting Review"}
                number={
                  data.data.filter((paper) => paper.approval_status == 3).length
                }
                papers={data.data.filter((paper) => paper.approval_status == 3)}
              />
              <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                <FilterExplanation
                  tooltip={"Papers we aprroved"}
                  text={"Papers you’ve submitted for review"}
                />
              </div>

              <SideStatus
                status={"Uncompleted submissions"}
                number={
                  data.data.filter((paper) => paper.approval_status == 0).length
                }
                papers={data.data.filter((paper) => paper.approval_status == 0)}
              />
              <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
                <FilterExplanation
                  tooltip={"Papers we aprroved"}
                  text={"Papers still in process of submission"}
                />
              </div>
            </SideControl>
          }
          graph={
            <div className="overflow-x-scroll h-full">
              {/* <NewPaperForm /> */}
              {paperToShow && <ApprovedPaper paperId={paperToShow} />}
            </div>
          }
        />
      )}
    </div>
  );
}
