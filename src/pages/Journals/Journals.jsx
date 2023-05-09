import { useQuery } from "@tanstack/react-query";
import React from "react";
import Select from "react-select";
import {
  FilterExplanation,
  RadioInput,
  RangeInput,
  ReportFilter,
  SideControl,
  Spacer,
  Text,
  TheoryDrivenFilter,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import TagsSelect from "../../components/TagsSelect";
import { navHeight, screenHeight, sideWidth } from "../../components/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import Navbar from "../../components/Navbar";
import getJournals from "../../apiHooks/getJournals";
import Spinner from "../../components/Spinner";
import Toggle from "../../components/Toggle";

export default function Journals() {
  const [experimentsNum, setExperimentsNum] = React.useState(0);
  const [reporting, setReporting] = React.useState("either");
  const [consciousness, setConsciousness] = React.useState("either");
  const [theoryDriven, setTheoryDriven] = React.useState("either");
  const [selectedParent, setSelectedParent] = React.useState({});

  const { data: configuration } = useQuery(
    [`parent_theories`],
    getConfiguration
  );

  const { data, isSuccess, isLoading } = useQuery(
    [
      `journals${
        +" " +
        selectedParent.value +
        " " +
        reporting +
        " " +
        theoryDriven +
        " " +
        experimentsNum +
        " " +
        consciousness
      }`,
    ],
    () =>
      getJournals({
        theory: selectedParent.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
      })
  );

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );
  const graphsData = isSuccess ? data?.data : [];

  var trace1 = {
    x: graphsData.map((row) => row.key),
    y: graphsData.map((row) => row.value),
    type: "bar",
    marker: {
      color: Math.floor(Math.random() * 16777215).toString(16),
    },
  };
  const graphWidth = 150 + trace1.x.length * 45;

  const sectionClass =
    "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
  return (
    <div style={{ height: screenHeight - navHeight }}>
      <Navbar />
      <div className="flex mt-12 p-2">
        <SideControl headline={"Journals"}>
          <div className={sectionClass}>
            <Text md weight="bold">
              Axis Controls
            </Text>
            <RangeInput number={experimentsNum} setNumber={setExperimentsNum} />
            <FilterExplanation
              text="minimum number of experiments"
              tooltip="few more words about minimum number of experiments"
            />
          </div>
          <div className={sectionClass}>
            <Text flexed md weight="bold">
              Theory
              <FilterExplanation tooltip="few more words about Thory" />
            </Text>

            <TagsSelect
              options={parentTheories}
              placeholder="Paradigms Family"
              defaultValue={selectedParent.value}
              onChange={setSelectedParent}
            />
          </div>
          <TypeOfConsciousnessFilter
            checked={consciousness}
            setChecked={setConsciousness}
          />
          <ReportFilter checked={reporting} setChecked={setReporting} />
          <TheoryDrivenFilter
            checked={theoryDriven}
            setChecked={setTheoryDriven}
          />
        </SideControl>

        <div
          className="overflow-x-scroll h-full"
          style={{ marginLeft: sideWidth }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <Plot
              data={[trace1]}
              layout={{
                autosize: false,
                width: graphWidth,
                height: screenHeight - 100,
                margin: { autoexpand: true, b: 150 },
                showlegend: false,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
