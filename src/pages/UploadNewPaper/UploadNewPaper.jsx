import { useNavigate } from "react-router-dom";
import { SideControl, TopSideUserBox } from "../../components/Reusble";
import PageTemplate from "../../components/PageTemplate";
import { useSnapshot } from "valtio";
import { state } from "../../state";

export default function UploadNewPaper() {
  const navigate = useNavigate();
  const pageName = "upload-new-paper";
  const snap = useSnapshot(state);

  return (
    <div className="h-full">
      <PageTemplate
        control={
          <SideControl
            isUploadPaper
            headline={<TopSideUserBox />}></SideControl>
        }
        graph={<div className="overflow-x-scroll h-full"></div>}
      />
    </div>
  );
}
