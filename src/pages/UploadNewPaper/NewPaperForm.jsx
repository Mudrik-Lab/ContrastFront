import React, { useMemo, useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  TooltipExplanation,
  Spacer,
  ToastBox,
} from "../../components/Reusble";
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
import getFormConfig from "../../apiHooks/getFormConfiguration";
import { submitStudy } from "../../apiHooks/getStudies";
import { toast } from "react-toastify";
import { ReactComponent as V } from "../../assets/icons/white-circle-v.svg";

export default function NewPaperForm({ setAddNewPaper, refetch }) {
  const [title, setTitle] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [addExperiments, setAddExperiments] = useState(false);
  const navigate = useNavigate();
  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const journals = extraConfig?.data.existing_journals.map((journal) => ({
    value: journal,
    label: journal,
  }));

  const authorsList = extraConfig?.data.available_authors.map((author) => ({
    value: author.id,
    label: author.name,
  }));

  const initialValues = {
    DOI: "",
    authors: [],
    source_title: "",
    countries: [],
    authors_key_words: [],
    year: "",
  };
  const validationSchema = Yup.object().shape({
    authors: Yup.array().min(1, "Please select at least one author"),
    source_title: Yup.object().required("Please select or add source title"),
    countries: Yup.array().min(1, "Please select at least one country"),
    DOI: Yup.string()
      .matches(
        /^10\.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i,
        "Please enter a valid DOI."
      )
      .required("DOI is required."),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await submitStudy({
        title,
        year: values.year,
        authors_key_words: ["akko", "crusaders"],
        authors: values.authors?.map((author) => author.value),
        countries: values.countries.map((country) => country.value),
        DOI: values.DOI,
        source_title: values.source_title.value,
      });
      console.log(res);
      if (res.status === 201) {
        setAddExperiments(true);

        refetch();
        toast.success(
          <ToastBox
            headline={"New experiment was created successfully"}
            text={"You can add the experiments details now"}
          />
        );
      }
    } catch (e) {
      const errors = Object.values(e.response.data);
      toast.error(<ToastBox text={e.message} headline={errors} />);
    }
  };
  const countryOption = useMemo(() => countryList().getData(), []);

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
          <TooltipExplanation
            text={""}
            tooltip={"Copy the paper’s title here"}
          />
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

                    <TooltipExplanation
                      text={""}
                      tooltip={"Enter the valid DOI of your study"}
                    />
                  </div>
                  <ErrorMessage
                    name="DOI"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Year
                  </Text>
                  <div className="flex items-center gap-2">
                    <Field
                      name="year"
                      id="year"
                      placeholder="Enter year"
                      className="border border-grayFrame p-2 w-full text-base rounded-md"
                    />

                    <TooltipExplanation
                      text={""}
                      tooltip={"Enter year of formal publication"}
                    />
                  </div>
                  <ErrorMessage
                    name="year"
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
                      placeholder="Select or Add Authors"
                      isClearable
                      options={authorsList}
                    />
                    <TooltipExplanation
                      text={""}
                      tooltip={
                        "Start typing the author’s last name and choose from the list below. If the author’s name does not appear in the list, add it manually following this format [LAST_NAME PRIVATE_NAME_INITIALS.; for example, Sanchez G. "
                      }
                    />{" "}
                  </div>
                  <ErrorMessage
                    name="authors"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Journal
                  </Text>
                  <div className="flex items-center gap-2">
                    <CreatableSelect
                      name="source_title"
                      id="source_title"
                      isMulti={false}
                      value={values.source_title}
                      onChange={(v) => setFieldValue("source_title", v)}
                      placeholder="Select or add journal"
                      isClearable
                      options={journals}
                    />

                    <TooltipExplanation
                      text={""}
                      tooltip={"Select one abbreviated source title"}
                    />
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

                    <TooltipExplanation text={""} tooltip={""} />
                  </div>{" "}
                  <ErrorMessage
                    name="countries"
                    component="div"
                    className={errorMsgClass}
                  />
                </div>
              </div>
              <Spacer height={20} />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  //   disabled={!(isSubmitting && isValid)}
                  className="bg-blue px-4 py-2 text-lg font-bold text-white rounded-full flex items-center gap-2 disabled:bg-grayLight disabled:text-grayHeavy">
                  <V />
                  Submit Paper
                </Button>
                <button
                  onClick={() => {
                    setAddNewPaper(false);
                    refetch();
                  }}
                  className="font-bold">
                  Exit
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Spacer height={20} />
        {addExperiments && (
          <div>
            <ExperimentsBox />
          </div>
        )}
      </div>
    </div>
  );
}
