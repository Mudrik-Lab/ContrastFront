import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Select from "react-select";
import {
  TooltipExplanation,
  RangeInput,
  ReportFilter,
  SideControl,
  Text,
  TopGraphText,
  CSV,
  Reset,
  TypeOfConsciousnessFilter,
  TheoryDrivenFilter,
} from "../../../sharedComponents/Reusble";
import { sideSectionClass } from "../../../Utils/HardCoded";
import getConfiguration from "../../../apiHooks/getConfiguration";
import PageTemplate from "../../../sharedComponents/PageTemplate";
import { graphsHeaders } from "../../../Utils/GraphsDetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { analyticsPlotInteraction, buildUrl } from "../../../Utils/functions";

import getBrains from "../../../apiHooks/getBrains";
import NoResults from "../../../sharedComponents/NoResults";
import Scale from "../../../sharedComponents/Scale";
import Spinner from "../../../sharedComponents/Spinner";

export default function AnatomicalFindings() {
  const [searchParams] = useSearchParams();
  const [selectedParent, setSelectedParent] = React.useState();
  const [reporting, setReporting] = React.useState();
  const [consciousness, setConsciousness] = React.useState();
  const [theoryDriven, setTheoryDriven] = React.useState();
  const [experimentsNum, setExperimentsNum] = React.useState();
  const [isCsv, setIsCsv] = React.useState(false);

  const navigate = useNavigate();
  const pageName = "anatomical-findings2";
  const imgType = "image/png";

  const { data: configuration, isSuccess: configurationSuccess } = useQuery(
    [`parent_theories`],
    getConfiguration
  );
  const parentTheories = configuration?.data.available_parent_theories.map(
    (parentTheory) => ({
      value: parentTheory,
      label: parentTheory,
    })

    // Notice: options here dont include the "all" option. add in the future
  );

  const { data, isLoading } = useQuery({
    queryKey: [
      pageName,
      selectedParent?.value,
      reporting,
      theoryDriven,
      consciousness,
      experimentsNum,
      isCsv,
    ],
    queryFn: () => {
      return getBrains({
        theory: selectedParent?.value,
        is_reporting: reporting,
        theory_driven: theoryDriven,
        type_of_consciousness: consciousness,
        min_number_of_experiments: experimentsNum,
        is_csv: isCsv,
      });
    },
    enabled: Boolean(selectedParent?.value),
  });

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

    if (queryParams.get("theory")) {
      setSelectedParent({
        value: queryParams.get("theory"),
        label: queryParams.get("theory"),
      });
    } else if (configurationSuccess) {
      setSelectedParent(parentTheories[0]);
    }

    navigate({ search: queryParams.toString() });

    // analyticsPlotInteraction(searchParams, pageName);
  }, [searchParams, configurationSuccess]);
  const color_list = data?.data[0].color_list;
  
  return (
    <div>
      {configurationSuccess && (
        <PageTemplate
          control={
            <SideControl headline={" Parameters Distribution Bar"}>
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
                  value={selectedParent}
                  onChange={(e) => {
                    buildUrl(pageName, "theory", e?.value, navigate);
                  }}
                />
                <TooltipExplanation
                  text={"Theory Family"}
                  tooltip="few more words about Theory"
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
            <div className="h-full flex flex-col">
              <TopGraphText
                text={graphsHeaders["Anatomical Findings"].figureText}
                firstLine={graphsHeaders["Anatomical Findings"].figureLine}
              />
              <div className="flex-1 overflow-auto ">
                {isLoading ? (
                  <div className=" flex flex-col items-center justify-center">
                    <Spinner />
                  </div>
                ) : data && color_list.length>0  ? (
                  <div className="h-full flex flex-col items-center justify-center p-20">
                    <h2 className="text-3xl">{data?.data[0].title_text}</h2>
                    <div className="h-full flex items-center justify-between">
                      <div className="flex flex-col items-center justify-center">
                        <h3 className="text-xl">Medial View </h3>
                        <img
                          src={`data:${imgType};base64,${data?.data[0].medial}`}
                        />
                      </div>

                      <div className="flex flex-col items-center justify-center">
                        <h3 className="text-xl ">Lateral View </h3>
                        <img
                          src={`data:${imgType};base64,${data?.data[0].lateral}`}
                        />
                      </div>
                      {/* <div
                        className="w-16 h-1/2 border" style={{ backgroundColor: color }} ></div> */}
                      <Scale color_list={color_list} />
                    </div>
                    <h4 className="text-xl">{data?.data[0].caption_text}</h4>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <NoResults />
                  </div>
                )}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
