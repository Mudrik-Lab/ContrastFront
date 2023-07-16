import React, { useMemo, useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { Text, FilterExplanation, Spacer } from "../../components/Reusble";
import { errorMsgClass, fieldClass } from "../../Utils/HardCoded";
import * as Yup from "yup";
import MultiSelect from "../../components/SelectField";
import classNames from "classnames";
import ExperimentsBox from "./ExperimentsBox";
import countryList from "react-select-country-list";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../apiHooks/getExtraConfig";

export default function NewPaperForm() {
  const [title, setTitle] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const navigate = useNavigate();
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const authorsList = extraConfig?.data.available_authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  const initialValues = {
    DOI: "",
    authors: [],
    source_title: "",
    countries: [],
  };
  const validationSchema = Yup.object().shape({
    authors: Yup.array().min(1, "Please select at least one author"),
    source_title: Yup.string().required("Please select at least one journal"),
    countries: Yup.array().min(1, "Please select at least one country"),
    DOI: Yup.string()
      .matches(
        /^10\.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i,
        "Please enter a valid DOI."
      )
      .required("DOI is required."),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
  const countryOption = useMemo(() => countryList().getData(), []);
  console.log(countryOption);
  return (
    <div className="p-4 pt-0 pl-0 ">
      <ProgressComponent
        status={"New Paper"}
        paperNmae={nameSubmitted}
        // experiment={experiment}
      />
      <Spacer height={10} />
      <div className="pl-2 w-1/2">
        <div className="flex items-center gap-2 my-4 ">
          <input
            type="text"
            placeholder="Enter New Paper Title"
            className={classNames(
              ` p-2 w-full text-3xl rounded-md 
                  ${nameSubmitted ? "border-none" : "border border-gray-400"}`
            )}
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => setNameSubmitted(e.target.value)}
            onKeyUp={(e) =>
              e.key === "Enter" && setNameSubmitted(e.target.value)
            }
          />
          <FilterExplanation text={""} tooltip={""} />
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          {({ isSubmitting, dirty, isValid, values, setFieldValue }) => (
            <Form>
              <div className="flex flex-col gap-4">
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    DOI
                  </Text>
                  <div className="flex items-center gap-2">
                    <Field
                      name="DOI"
                      id="DOI"
                      placeholder="Enter your DOI identifier"
                      className="border border-grayFrame p-2 w-full text-base rounded-md"
                    />

                    <FilterExplanation text={""} tooltip={""} />
                  </div>
                  <ErrorMessage
                    name="paperName"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Authors
                  </Text>
                  <div className="flex items-center gap-2">
                    <CreatableSelect
                      name="authors"
                      id="authors"
                      isMulti={true}
                      value={values.authors}
                      onChange={(v) => setFieldValue("authors", v)}
                      placeholder="Add Authors"
                      isClearable
                      options={authorsList}
                    />
                    <FilterExplanation text={""} tooltip={""} />{" "}
                  </div>
                  <ErrorMessage
                    name="paperName"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Journals
                  </Text>
                  <div className="flex items-center gap-2">
                    <Field
                      name="source_title"
                      id="source_title"
                      placeholder="Select Journals"
                      className={
                        "border border-grayFrame p-2 w-full text-base rounded-md"
                      }
                    />

                    <FilterExplanation text={""} tooltip={""} />
                  </div>
                  <ErrorMessage
                    name="source_title"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Countries
                  </Text>
                  <div className="flex items-center gap-2">
                    <Select
                      name="countries"
                      isClearable
                      value={values.countries}
                      onChange={(v) => setFieldValue("countries", v)}
                      placeholder="Add Countries"
                      isMulti={true}
                      component={MultiSelect}
                      options={countryOption}
                    />

                    <FilterExplanation text={""} tooltip={""} />
                  </div>{" "}
                  <ErrorMessage
                    name="countries"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
              </div>
              <Spacer height={20} />

              <div className="flex gap-2">
                <button
                  type="submit"
                  //   disabled={!(isSubmitting && isValid)}
                  className="bg-blue px-4 py-2 text-lg font-bold text-white rounded-full flex items-center gap-2 disabled:bg-grayLight disabled:text-grayHeavy">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_1221_7195)">
                      <path
                        d="M10.7533 5.34351L7.45445 9.54666L5.56082 7.65212L5.56093 7.65201L5.55443 7.64596C5.36486 7.46932 5.11413 7.37315 4.85507 7.37772C4.596 7.38229 4.34882 7.48724 4.1656 7.67046C3.98238 7.85368 3.87743 8.10086 3.87286 8.35993C3.86829 8.61899 3.96446 8.86972 4.1411 9.05929L4.14098 9.0594L4.14719 9.0656L6.79319 11.7126L6.79338 11.7128C6.88843 11.8077 7.0016 11.8824 7.12616 11.9326C7.25072 11.9828 7.38411 12.0074 7.51838 12.0049C7.65264 12.0024 7.78503 11.9729 7.90765 11.9181C8.03026 11.8634 8.14059 11.7845 8.23205 11.6861L8.2384 11.6793L8.24422 11.672L12.2296 6.6903C12.4057 6.50263 12.5028 6.25412 12.5004 5.99644C12.4979 5.73468 12.3929 5.48434 12.2079 5.29916L12.1346 5.22586H12.1248C12.0487 5.16502 11.9639 5.11551 11.873 5.07906C11.7483 5.02898 11.6147 5.00458 11.4802 5.00732C11.3458 5.01006 11.2133 5.03988 11.0907 5.095C10.968 5.15012 10.8578 5.2294 10.7665 5.32811L10.7596 5.33554L10.7533 5.34351ZM15.75 8.50586C15.75 10.5613 14.9335 12.5325 13.4801 13.9859C12.0267 15.4393 10.0554 16.2559 8 16.2559C5.94457 16.2559 3.97333 15.4393 2.51992 13.9859C1.06652 12.5325 0.25 10.5613 0.25 8.50586C0.25 6.45043 1.06652 4.47919 2.51992 3.02578C3.97333 1.57238 5.94457 0.755859 8 0.755859C10.0554 0.755859 12.0267 1.57238 13.4801 3.02578C14.9335 4.47919 15.75 6.45043 15.75 8.50586Z"
                        fill="white"
                      />
                    </g>
                  </svg>
                  Submit Paper
                </button>
                <button className="font-bold text-lg"> Save& Exit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
