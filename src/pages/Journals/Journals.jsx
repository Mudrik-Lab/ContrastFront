import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  FilterExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../components/Reusble";
import Plot from "react-plotly.js";
import {
  isMoblile,
  screenWidth,
  sideSectionClass,
} from "../../Utils/HardCoded";
import getConfiguration from "../../apiHooks/getConfiguration";
import getJournals from "../../apiHooks/getJournals";
import Spinner from "../../components/Spinner";
import PageTemplate from "../../components/PageTemplate";
import { designerColors } from "../../Utils/Colors";
import { graphsHeaders } from "../../Utils/GraphsDetails";

export default function Journals() {
  const queryParams = new URLSearchParams(location.search);
  console.log();
  const [experimentsNum, setExperimentsNum] = React.useState(
    queryParams.get("min_number_of_experiments") || 0
  );
  const [reporting, setReporting] = React.useState(
    queryParams.get("is_reporting") || "either"
  );
  const [consciousness, setConsciousness] = React.useState(
    queryParams.get("type_of_consciousness") || "either"
  );
  const [theoryDriven, setTheoryDriven] = React.useState(
    queryParams.get("theory_driven") || "either"
  );
  const [theory, setTheory] = React.useState(
    { value: queryParams.get("theory"), label: queryParams.get("theory") } || {}
  );
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: configuration } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const { data, isSuccess, isLoading } = useQuery(
    [
      `journals${
        +" " +
        theory?.value +
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
        theory: theory?.value,
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
  const Y = graphsData.map((row) => row.key);
  var trace1 = {
    y: Y,
    x: graphsData.map((row) => row.value).reverse(),
    type: "bar",
    orientation: "h",
    marker: {
      color:
        designerColors[Math.floor(Math.random() * (designerColors.length - 1))],
    },
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams);
    queryParams.set("is_reporting", reporting);
    queryParams.set("type_of_consciousness", consciousness);
    queryParams.set("theory_driven", theoryDriven);
    queryParams.set("min_number_of_experiments", experimentsNum);
    queryParams.set("theory", theory?.value);
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  return (
    <div className="h-full">
      <PageTemplate
        control={
          <SideControl headline={"Journals"}>
            <Text md weight="bold">
              Axis Controls
            </Text>
            <RangeInput
              number={experimentsNum}
              setNumber={(e) => {
                setExperimentsNum(e);
                navigate(
                  `?min_number_of_experiments=${encodeURIComponent(
                    experimentsNum
                  )}`
                );
              }}
            />

            <div className={sideSectionClass}>
              <Select
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={true}
                options={parentTheories}
                value={theory}
                onChange={(e) => {
                  setTheory(e);
                  navigate(`?theory=${encodeURIComponent(theory.value)}`);
                }}
              />
              <Text flexed size={14}>
                Theory Family
                <FilterExplanation tooltip="few more words about Thory" />
              </Text>
            </div>

            <TypeOfConsciousnessFilter
              checked={consciousness}
              setChecked={(e) => {
                setConsciousness(e);
                navigate(
                  `?type_of_consciousness=${encodeURIComponent(consciousness)}`
                );
              }}
            />
            <ReportFilter
              checked={reporting}
              setChecked={(e) => {
                setReporting(e);
                navigate(`?is_reporting=${encodeURIComponent(reporting)}`);
              }}
            />
            <TheoryDrivenFilter
              checked={theoryDriven}
              setChecked={(e) => {
                setTheoryDriven(e);
                navigate(`?theory_driven=${encodeURIComponent(theoryDriven)}`);
              }}
            />
          </SideControl>
        }
        graph={
          <div className="overflow-x-scroll h-full">
            <TopGraphText
              text={graphsHeaders[9].figureText}
              firstLine={graphsHeaders[9].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <Plot
                data={[trace1]}
                layout={{
                  autosize: false,
                  width: isMoblile ? screenWidth : screenWidth - 400,
                  height: 35 * Y?.length + 350,
                  showlegend: false,

                  legend: { itemwidth: 90 },
                  xaxis: {
                    title: "Number of experiments",
                    zeroline: true,
                    side: "top",
                    tickfont: {
                      size: 16,
                      standoff: 50,
                    },
                  },
                  yaxis: {
                    automargin: true,

                    ticks: "outside",
                    tickangle: 315,
                    tickfont: {
                      size: 12,
                      standoff: 50,
                    },
                  },
                }}
              />
            )}
          </div>
        }
      />
    </div>
  );
}
