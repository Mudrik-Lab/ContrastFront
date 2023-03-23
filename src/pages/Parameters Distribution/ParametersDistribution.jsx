import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  Text,
} from "../../components/Reusble";
import SimpleBarChart from "../../components/SimpleBarChart";
import TagsSelect from "../../components/TagsSelect";

export default function ParametersDistribution() {
  const [selected, setSelected] = React.useState(["tag", "TAG"]);

  // const { data, isSuccess } = useQuery(
  //   ["parameters_distribution"],
  //   useGetParamaetersDis
  // );
  // isSuccess && console.log(data);

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
  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  const selectOptions1 = ["Ory", "Elad", "Alon", "Dani"];
  return (
    <div className="flex ">
      <div className="side-filter-box border p-7 pt-10 flex flex-col items-center ">
        <Text size={28} weight="bold" color="blue">
          Parameters Distribution
        </Text>
        <div className="w-[346px] shadow-lg mt-10 mx-auto bg-white flex flex-col items-center gap-2 px-4 py-2 ">
          <Text md weight="bold">
            Axis Controls
          </Text>
          <div className={sectionClass}>
            <RangeInput />
            <FilterExplanation
              text="minimum number of experiments"
              tooltip="few more words about minimum number of experiments"
            />
          </div>
          <div className={sectionClass}>
            <Select
              closeMenuOnSelect={true}
              placeholder="X axis category selection.."
              options={colourOptions}
            />
            <FilterExplanation
              text="Choose parameter of interest"
              tooltip="few more words about Choose parameter of interest"
            />
          </div>
          <div className={sectionClass}>
            <RadioInput />
            <FilterExplanation
              text="Select results format"
              tooltip="few more words about Select results format"
            />
          </div>
          <div className={sectionClass}>
            <Text md weight="bold">
              Filter Tags
            </Text>
            <Select
              closeMenuOnSelect={true}
              isMulti={true}
              options={colourOptions}
              placeholder="Paradigms Family"
            />
            <FilterExplanation
              text="Paradigms Family"
              tooltip="few more words about Paradigms Family"
            />
          </div>
          <div className={sectionClass}>
            <Select
              closeMenuOnSelect={true}
              placeholder="Paradigm"
              options={colourOptions}
            />

            <FilterExplanation
              text="Paradigm "
              tooltip="few more words about Paradigm "
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
