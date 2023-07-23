import {
  ExpandingBox,
  FilterExplanation,
  Spacer,
  Text,
  Button,
} from "../../../components/Reusble";
import Select from "react-select";

export default function BasicClassification({ setFieldValue }) {
  return (
    <ExpandingBox headline={"Basic"}>
      <div className=" flex flex-col gap-4 border border-blue border-x-4 p-2 rounded-md">
        <div>
          <Text weight={"bold"} color={"grayReg"}>
            Type of consciousness
          </Text>
          <div className="flex items-center gap-2">
            <Select
              id="type_of_consciousness"
              name="type_of_consciousness"
              onChange={(v) => setFieldValue("type_of_consciousness", v)}
              placeholder="Select Type of Consciousness"
              options={[
                { vlaue: null, label: "" },
                { value: "state", label: "State" },
                { value: "content", label: "Content" },
              ]}
            />

            <FilterExplanation text={""} tooltip={""} />
          </div>{" "}
        </div>
        <div>
          <Text weight={"bold"} color={"grayReg"}>
            Report/No report
          </Text>
          <div className="flex items-center gap-2">
            <Select
              id="report"
              name="report"
              onChange={(v) => setFieldValue("report", v)}
              placeholder="Select"
              options={[
                { vlaue: null, label: "" },
                { value: "report", label: "Report" },
                { value: "no-report", label: "No Report" },
              ]}
            />

            <FilterExplanation text={""} tooltip={""} />
          </div>{" "}
        </div>
        <div>
          <Text weight={"bold"} color={"grayReg"}>
            Theory driven
          </Text>
          <div className="flex items-center gap-2">
            <Select
              id="theory_driven"
              name="theory_driven"
              onChange={(v) => setFieldValue("theory_driven", v)}
              placeholder="Select Theory "
              options={[
                { vlaue: null, label: "" },
                { value: "driven", label: "Driven" },
                { value: "mentioning", label: "Mentioning" },
                { value: "post-hoc", label: "Post Hoc" },
              ]}
            />
            <FilterExplanation text={""} tooltip={""} />
          </div>
        </div>
        {/* <Button type="submit">Submit this level</Button> */}
      </div>
    </ExpandingBox>
  );
}
