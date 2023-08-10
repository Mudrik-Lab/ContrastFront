import React, { useEffect, useMemo, useState } from "react";
import ProgressComponent from "./ProgressComponent";
import {
  Button,
  TooltipExplanation,
  Spacer,
  Text,
  ToastBox,
} from "../../components/Reusble";
import ExperimentsBox from "./ExperimentsBox";
import ExperimentDetails from "./ExperimentsSection/ExperimentDetails";
import { countries } from "countries-list";
import countryList from "react-select-country-list";

import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  errorMsgClass,
  fieldClass,
  footerHeight,
  navHeight,
  upladPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../Utils/HardCoded";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import MultiSelect from "../../components/SelectField";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../apiHooks/getExtraConfig";
import { EditUncompletedStudy } from "../../apiHooks/getStudies";
import ExperimentForm from "./ExperimentsSection/ExperimentForm";
import { ReactComponent as V } from "../../assets/icons/white-circle-v.svg";
import { toast } from "react-toastify";

export default function UncompletedPaper({
  study,
  paperToShow,
  setPaperToShow,
  paperToEdit,
  setPaperToEdit,
  showEditble,
  refetch,
  setAddNewPaper,
  setShowEditble,
  newPaper,
  setNewPaper,
  addNewExperiment,
  setAddNewExperiment,
}) {
  const [title, setTitle] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const countryOption = useMemo(() => countryList().getData(), []);

  const { data: extraConfig, isSuccess: extraConfigSuccess } = useQuery(
    [`more_configurations`],
    getExtraConfig
  );
  const authorsList = extraConfig?.data.available_authors.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  const journalsList = extraConfig?.data.existing_journals.map((journal) => ({
    value: journal,
    label: journal,
  }));

  useEffect(() => {
    setTitle(study.title);
  }, []);

  const initialValues = {
    DOI: study.DOI || "",
    authors_key_words: study.authors_key_words || [],
    year: study.year,
    authors: study.authors.map((author) => ({
      value: author.id,
      label: author.name,
    })),
    source_title: study.source_title,
    countries: study.countries.map((country) => ({
      value: country,
      label: countries[country].name,
    })),
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

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const res = await EditUncompletedStudy({
        title,
        id: study.id,
        year: values.year,
        authors_key_words: values.authors_key_words,
        authors: values.authors?.map((author) => author.value),
        countries: values.countries.map((country) => country.value),
        DOI: values.DOI,
        source_title: values.source_title,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(
          <ToastBox
            headline={"Success"}
            text={"Study's details were updated"}
          />
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="h-full ">
      {study && (
        <div className="h-full">
          <ProgressComponent
            status={"Uncompleted submissins"}
            paperNmae={
              study.title.length > 35
                ? study.title.slice(0, 35) + "..."
                : study.title
            }
            experiment={paperToShow?.title}
          />
          <Spacer height={10} />
          <div className="flex justify-between relative">
            <div
              className="p-2 w-1/2 shadow-3xl overflow-y-scroll"
              style={{
                height: `calc(100vh - ${
                  uploadPaperUsedHeight + upladPaperPageTopSection + 10
                }px)`,
              }}>
              {addNewExperiment && (
                <div className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-60 z-50"></div>
              )}
              {paperToEdit && (
                <div className="absolute top-0 left-0 w-1/2 h-full bg-white opacity-60 z-50"></div>
              )}
              <div className="flex flex-col gap-4">
                <div className="h-full w-full">
                  <Text weight={"bold"} color={"grayReg"}>
                    Paper Title
                  </Text>
                  <div className="flex items-center gap-2 ">
                    <input
                      type="text"
                      placeholder="Enter New Paper Title"
                      className={classNames(
                        ` p-2 w-full text-2xl rounded-md border-none`
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
                </div>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}>
                  {({
                    isSubmitting,
                    dirty,
                    isValid,
                    values,
                    setFieldValue,
                  }) => (
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
                            name="paperName"
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
                              placeholder="Add Authors"
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
                            name="paperName"
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
                              name={"source_title"}
                              id={"source_title"}
                              isClearable
                              defaultInputValue={values.source_title}
                              onChange={(v) => {
                                setFieldValue("source_title", v.value);
                              }}
                              options={journalsList}
                            />

                            <TooltipExplanation
                              text={""}
                              tooltip={"Select one abbreviated journal name"}
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

                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting && !isValid}
                          extraClass={
                            " disabled:bg-grayLight disabled:text-grayHeavy disabled:border-none"
                          }>
                          <V />
                          Update Paper
                        </Button>
                        <button
                          type="button"
                          onClick={() => {
                            setAddNewPaper(false);
                            setPaperToShow(false);
                            setPaperToEdit(false);
                            setShowEditble(false);
                            refetch();
                          }}
                          className="font-bold">
                          Exit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <Spacer height={20} />
              <ExperimentsBox
                refetch={refetch}
                completedStudy={false}
                disabled={false}
                setNewPaper={setNewPaper}
                setPaperToShow={setPaperToShow}
                setPaperToEdit={setPaperToEdit}
                study={study}
                setAddNewExperiment={setAddNewExperiment}
                showEditble={showEditble}
                experiments={study?.experiments.map((experiment, index) => ({
                  ...experiment,
                  title: `Experiment #${index + 1}`,
                }))}
              />
              <Spacer height={20} />
            </div>
            {addNewExperiment && (
              <ExperimentForm
                setNewPaper={setNewPaper}
                setPaperToEdit={setPaperToEdit}
                study={study}
                setAddNewExperiment={setAddNewExperiment}
                refetch={refetch}
              />
            )}
            {paperToShow && !newPaper && (
              <ExperimentDetails
                experiment={paperToShow}
                study={study}
                setPaperToShow={setPaperToShow}
              />
            )}
            {paperToEdit && (
              <ExperimentForm
                setNewPaper={setNewPaper}
                experimentData={paperToEdit}
                setAddNewExperiment={setAddNewExperiment}
                setPaperToEdit={setPaperToEdit}
                refetch={refetch}
                study={study}
                isEditMode={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
