import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  CSV,
  TooltipExplanation,
  ReportFilter,
  Reset,
  SideControl,
  Text,
  TheoryDrivenFilter,
  TopGraphText,
  TypeOfConsciousnessFilter,
  RangeInput,
} from "../../../sharedComponents/Reusble";
import {

  sideSectionClass,
} from "../../../Utils/HardCoded";
import getConfiguration from "../../../apiHooks/getConfiguration";

import { analyticsPlotInteraction } from "../../../Utils/functions";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { buildUrl } from "../../../Utils/functions";
import NoResults from "../../../sharedComponents/NoResults";

import getBrains from "../../../apiHooks/getBrains";
import { graphsHeaders } from "../../../Utils/GraphsDetails";

export default function AnatomicalFindings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [theory, setTheory] = React.useState();
  const [isCsv, setIsCsv] = React.useState(false);
  const navigate = useNavigate();
  const pageName = "anatomical-findings";
  const imgType = "image/png";
  const { data: configuration, isSuccess: configSuccess } = useQuery(
    [`confuguration`],
    getConfiguration
  );

  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      pageName,
      theory?.value,
      reporting,
      theoryDriven,
      consciousness,
      experimentsNum,
      isCsv,
    ],
    queryFn: () =>
      getBrains({
        theory: theory?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
        is_csv: isCsv,
      }),
    enabled: Boolean(theory?.value),
  });

useEffect(() => {
  const queryParams = new URLSearchParams(location.search);
  if (queryParams.get("theory")) {
    setTheory({
      value: queryParams.get("theory"),
      label: queryParams.get("theory"),
    });
  } else if (configSuccess) {
    setTheory(parentTheories[0]);
  }
}, [])



  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    queryParams.get("is_reporting")
      ? setReporting(queryParams.get("is_reporting"))
      : setReporting("either");

    queryParams.get("min_number_of_experiments")
      ? setExperimentsNum(queryParams.get("min_number_of_experiments"))
      : setExperimentsNum(0);

    queryParams.get("type_of_consciousness")
      ? setConsciousness(queryParams.get("type_of_consciousness"))
      : setConsciousness("either");

    queryParams.get("theory_driven")
      ? setTheoryDriven(queryParams.get("theory_driven"))
      : setTheoryDriven("either");

    
    analyticsPlotInteraction(searchParams, pageName);
    navigate({ search: queryParams.toString() });
  }, [searchParams]);

  // useEffect to state the initial values on mount (insert all options or takes from url)

  return (
    <div>
      <PageTemplate
        control={
          <SideControl headline="Anatomical Findings">
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
                aria-label="theory family"
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable={false}
                options={parentTheories}
                value={theory}
                onChange={(e) => {
                  buildUrl(pageName, "theory", e?.value, navigate);
                }}
              />

              <TooltipExplanation
                text={"Theory Family"}
                tooltip="few more words about Thory"
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
          <div className="h-full">
            <TopGraphText
              text={graphsHeaders["Anatomical Findings"].figureText}
              firstLine={graphsHeaders["Anatomical Findings"].figureLine}
            />
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center">
                <img src={"/src/assets/brain-loader.gif"} width={"50%"} />
                <h1 className="text-xl">We're processing the data...</h1>
              </div>
            ) : (
              data ? (
                <div className="h-full flex items-center justify-between">
                  <img
                    width={"50%"}
                    src={`data:${imgType};base64,${data?.data[0].medial}`}
                  />
                  <img
                    width={"50%"}
                    src={`data:${imgType};base64,${data?.data[0].lateral}`}
                  />
                </div>
              ):
              <NoResults/>
            )}
          </div>
        }
      />
    </div>
  );
}
