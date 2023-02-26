import { useQuery } from "@tanstack/react-query";
import React from "react";

import {
  Label,
  RadioInput,
  RangeInput,
  Select,
} from "../../components/Reusble";
import SimpleBarChart from "../../components/SimpleBarChart";
import TagsSelect from "../../components/TagsSelect";

export default function ParametersDistribution() {
  const [selected, setSelected] = React.useState(["tag", "TAG"]);

  const { data, isSuccess } = useQuery(
    ["parameters_distribution"],
    useGetParamaetersDist
  );
  isSuccess && console.log(data);

  const colourOptions = [
    { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
    { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
    { value: "purple", label: "Purple", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ];
  return (
    <div className="flex ">
      <div className="border p-7 pt-10 flex flex-col items-center">
        <h1>Free Queries</h1>
        <div className="w-72 shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
          <h4>Axis Controls</h4>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <RangeInput />
            <Label>min. # of experiments</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <Select />
            <Label>choose Y axis Value</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <RadioInput />
            <Label>choose X axis Value</Label>
          </div>
          <div className="w-full border-b py-5 flex flex-col items-center gap-3 ">
            <h3>Filter Tags</h3>
            <TagsSelect
              options={colourOptions}
              placeholder="Paradigms Family"
            />
          </div>
        </div>
      </div>

      <div>
        <SimpleBarChart />
      </div>
    </div>
  );
}
