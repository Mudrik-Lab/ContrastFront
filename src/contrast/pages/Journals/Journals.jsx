import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  CSV,
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
} from "../../../sharedComponents/Reusble";
import {
  plotConfig,
  screenWidth,
  sideSectionClass,
  xAxisConfig,
} from "../../../Utils/HardCoded";
import getConfiguration from "../../../apiHooks/getConfiguration";
import getJournals from "../../../apiHooks/getJournals";
import Spinner from "../../../sharedComponents/Spinner";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { designerColors } from "../../../Utils/Colors";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { AnalyticsPlotInteraction, buildUrl } from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

export default function Journals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [theory, setTheory] = React.useState();

  const navigate = useNavigate();
  const pageName = "journals";

  const { data: configuration } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: [
      "journals",
      theory?.value,
      reporting,
      theoryDriven,
      experimentsNum,
      consciousness,
    ],
    queryFn: () =>
      getJournals({
        theory: theory?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
      }),
  });
  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );
  const graphsData = isSuccess ? data?.data : [];
  const Y = graphsData.map((row) => row.key);
  var trace1 = {
    y: Y.reverse(),
    x: graphsData.map((row) => row.value).reverse(),
    type: "bar",
    orientation: "h",
    marker: {
      color: designerColors[46],
    },
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.get("is_reporting")
      ? setReporting(queryParams.get("is_reporting"))
      : setReporting("either");
    queryParams.get("type_of_consciousness")
      ? setConsciousness(queryParams.get("type_of_consciousness"))
      : setConsciousness("either");

    queryParams.get("theory_driven")
      ? setTheoryDriven(queryParams.get("theory_driven"))
      : setTheoryDriven("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    if (queryParams.get("theory") !== "undefined") {
      setTheory({
        value: queryParams.get("theory"),
        label: queryParams.get("theory"),
      });
    } else {
      setTheory({});
    }

    navigate({ search: queryParams.toString() });
    AnalyticsPlotInteraction(searchParams, pageName);
  }, [searchParams]);

  return (
    <div className="h-full">
      <PageTemplate
        control={
          <SideControl headline={"Journals"}>
            <Text lg weight="bold">
              Axis Controls
            </Text>
            <RangeInput
              number={experimentsNum}
              setNumber={(e) => {
                buildUrl(pageName, "min_number_of_experiments", e, navigate);
              }}
            />

            <div className={sideSectionClass}>
              <Select
                className="text-lg w-[300px]"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={true}
                options={parentTheories}
                value={theory}
                onChange={(e) => {
                  buildUrl(pageName, "theory", e?.value, navigate);
                }}
              />

              <TooltipExplanation
                text={"Theory Family"}
                tooltip="You can use this to filter the result by a specific theory family or select none to not filter."
              />
            </div>

            <TypeOfConsciousnessFilter
              checked={consciousness}
              setChecked={(e) => {
                buildUrl(pageName, "type_of_consciousness", e, navigate);
              }}
            />
            <ReportFilter
              checked={reporting}
              setChecked={(e) => {
                buildUrl(pageName, "is_reporting", e, navigate);
              }}
            />
            <TheoryDrivenFilter
              checked={theoryDriven}
              setChecked={(e) => {
                buildUrl(pageName, "theory_driven", e, navigate);
              }}
            />
            <div className="w-full flex items-center justify-between my-4">
              <CSV data={data} />
              <Reset pageName={pageName} />
            </div>
          </SideControl>
        }
        graph={
          <div className="overflow-x-scroll h-full">
            <TopGraphText
              text={graphsHeaders["Journals"].figureText}
              firstLine={graphsHeaders["Journals"].figureLine}
            />
            {isLoading ? (
              <Spinner />
            ) : !data?.data.length ? (
              <NoResults />
            ) : (
              <Plot
                data={[trace1]}
                config={plotConfig}
                layout={{
                  autosize: false,
                  width: screenWidth,
                  height: 35 * Y?.length + 350,
                  showlegend: false,

                  legend: { itemwidth: 90 },
                  xaxis: xAxisConfig,

                  yaxis: {
                    automargin: true,
                    showgrid: false,
                    ticks: "outside",
                    tickangle: 315,
                    tickfont: {
                      size: 18,
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
