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

export default function UploadNewPaper() {
  const navigate = useNavigate();
  const pageName = "upload-new-paper";
  const snap = useSnapshot(state);

  const { data, isSuccess } = useQuery(
    ["submitted_studies"],
    getMySubmittedStudies
  );
  isSuccess && console.log(data);

  return (
    <div className="h-full">
      <PageTemplate
        control={
          <SideControl isUploadPaper headline={<TopSideUserBox />}>
            <SideStatus status={"Complete"} number={1} />
            <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
              <FilterExplanation
                tooltip={"Papers we aprroved"}
                text={"Your approved papers"}
              />
            </div>

            <SideStatus status={"Awaiting Review"} number={2} />
            <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
              <FilterExplanation
                tooltip={"Papers we aprroved"}
                text={"Your approved papers"}
              />
            </div>

            <SideStatus status={"In Progress"} number={1} />
            <div className="w-full flex justify-center border-b border-black pb-4 mb-4">
              <FilterExplanation
                tooltip={"Papers we aprroved"}
                text={"Your approved papers"}
              />
            </div>
          </SideControl>
        }
        graph={
          <div className="overflow-x-scroll h-full">
            <NewPaperForm />{" "}
          </div>
        }
      />
    </div>
  );
}
