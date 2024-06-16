import React, { useEffect, useMemo, useState } from "react";
import ProgressComponent from "./ProgressComponent";
import {
  Button,
  TooltipExplanation,
  Spacer,
  Text,
  ToastBox,
  ToastErrorBox,
} from "../../../sharedComponents/Reusble";
import ExperimentsBox from "./ExperimentsBox";
import ExperimentDetails from "./ExperimentsSection/ExperimentDetails";
import { countries } from "countries-list";
import countryList from "react-select-country-list";

import classNames from "classnames";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  errorMsgClass,
  studyValidationSchema,
  uploadPaperPageTopSection,
  uploadPaperUsedHeight,
} from "../../../Utils/HardCoded";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import MultiSelect from "../../../sharedComponents/SelectField";
import { useQuery } from "@tanstack/react-query";
import getExtraConfig from "../../../apiHooks/getExtraConfig";
import { EditUncompletedStudy } from "../../../apiHooks/getStudies";
import ExperimentForm from "./ExperimentsSection/ExperimentForm";
import { ReactComponent as V } from "../../../assets/icons/white-circle-v.svg";
import { toast } from "react-toastify";
import FinalSubmit from "../../../sharedComponents/FinalSubmit";
import { createNewAuthor } from "../../../apiHooks/createNewAuthor";
import { ToastError } from "../../../Utils/functions";

export default function UncompletedPaper({
  study,
  experimentToShow,
  setExperimentToShow,
  paperToEdit,
  setExperimentToEdit,
  showEditble,
  refetch,
  setAddNewPaper,
  setShowEditble,
  newPaper,
  setNewPaper,
  addNewExperiment,
  setAddNewExperiment,
  allStudiesRefetch,
}) {
  const [title, setTitle] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [authorsOptions, setAuthorOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(
    study.authors.map((author) => ({
      value: author.id,
      label: author.name,
    })) || []
  );
  const [authorsError, setAuthorsError] = useState(false);

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
  }, [study]);

  useEffect(() => {
    setAuthorOptions(authorsList);
  }, [extraConfig]);

  const handleNewAuthor = async (authorName) => {
    try {
      setIsLoading(true);
      const res = await createNewAuthor(authorName);
      if (res.status === 201) {
        setAuthorOptions((prev) => [
          ...prev,
          { label: res.data.name, value: res.data.id },
        ]);
        setValue((prev) => [
          ...prev,
          { label: res.data.name, value: res.data.id },
        ]);
        setIsLoading(false);
      }
    } catch (e) {
      ToastError(e);
    }
  };

  const initialValues = {
    DOI: study.DOI || "",
    authors_key_words: study.authors_key_words || [],
    year: study.year,
    source_title: study.source_title,
    countries: study.countries.map((country) => ({
      value: country,
      label: countries[country].name,
    })),
    is_author_submitter: study.is_author_submitter || false,
  };

  const handleSubmit = async (values) => {
    if (!value.length) {
      setAuthorsError("Please select at least one author");
      return;
    } else {
      setAuthorsError(false);
    }
    try {
      const res = await EditUncompletedStudy({
        title,
        id: study.id,
        year: values.year,
        authors_key_words: values.authors_key_words,
        authors: value.map((author) => author.value),
        countries: values.countries.map((country) => country.value),
        DOI: values.DOI,
        source_title: values.source_title,
        is_author_submitter: values?.is_author_submitter,
      });

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
            status={"Uncompleted submissions"}
            paperNmae={
              study.title.length > 45
                ? study.title.slice(0, 45) + "..."
                : study.title
            }
            experiment={
              experimentToShow?.title ||
              paperToEdit?.title ||
              (addNewExperiment && "New Experiment")
            }
          />
          <Spacer height={10} />
          <div className="flex justify-between relative ">
            <div
              className="p-2 w-1/2 shadow-3xl overflow-y-scroll"
              style={{
                height: `calc(100vh - ${
                  uploadPaperUsedHeight + uploadPaperPageTopSection + 10
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
                  enableReinitialize={true}
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={studyValidationSchema}>
                  {({ isValid, values, setFieldValue }) => (
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
                              tooltip={
                                "Enter the paper’s DOI (e.g. 10.1038/s41562-021-01284-5"
                              }
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
                          <Text
                            weight={"bold"}
                            color={"grayReg"}
                            aria-role="label">
                            Authors
                          </Text>
                          <label htmlFor="Authors"></label>
                          <div className="flex items-center gap-2">
                            <CreatableSelect
                              name="Authors"
                              isMulti
                              isClearable
                              isDisabled={isLoading}
                              isLoading={isLoading}
                              onCreateOption={handleNewAuthor}
                              onChange={(v) => setValue(v)}
                              placeholder="Select or Add Authors"
                              options={authorsOptions}
                              value={value}
                            />
                            <TooltipExplanation
                              text={""}
                              tooltip={
                                "Start typing the author’s last name and choose from the list below. If the author’s name does not appear in the list, add it manually following this format [LAST_NAME PRIVATE_NAME_INITIALS.; for example, Sanchez G. "
                              }
                            />{" "}
                          </div>
                          {authorsError && (
                            <Text className={errorMsgClass}>
                              {authorsError}
                            </Text>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-1 items-center ">
                            <Field
                              aria-label="Are you one of the authors of this paper?"
                              type="checkbox"
                              name="is_author_submitter"
                              className="text-blue rounded-sm "
                            />
                            <Text weight={"bold"} color={"grayReg"}>
                              I am one of the authors
                            </Text>
                          </div>
                          <TooltipExplanation
                            text={""}
                            tooltip={
                              "Mark this checkbox only if you are one of the authors of this paper"
                            }
                          />
                        </div>
                        <div>
                          <Text
                            weight={"bold"}
                            color={"grayReg"}
                            aria-role="label">
                            Journal
                          </Text>
                          <div className="flex items-center gap-2">
                            <CreatableSelect
                              name={"source_title"}
                              id={"source_title"}
                              isClearable
                              defaultInputValue={values?.source_title}
                              onChange={(v) => {
                                setFieldValue("source_title", v?.value);
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

                            <TooltipExplanation
                              text={""}
                              tooltip={
                                "Add the country or countries of the affiliations of the authors."
                              }
                            />
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
                          disabled={!isValid}
                          className={
                            "bg-blue px-4 py-2 text-lg font-bold text-white rounded-full flex items-center gap-2 disabled:bg-grayLight disabled:text-grayHeavy"
                          }>
                          <V />
                          Update Paper
                        </Button>
                        <button
                          type="button"
                          onClick={() => {
                            setAddNewPaper(false);
                            setExperimentToShow(false);
                            setExperimentToEdit(false);
                            setShowEditble(false);
                            refetch();
                          }}
                          className="font-bold">
                          Close Paper
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
                setExperimentToShow={setExperimentToShow}
                setExperimentToEdit={setExperimentToEdit}
                study={study}
                setAddNewExperiment={setAddNewExperiment}
                showEditble={showEditble}
                experiments={study?.experiments.map((experiment, index) => ({
                  ...experiment,
                  title: `Experiment #${index + 1}`,
                }))}
              />
              <Spacer height={20} />

              <FinalSubmit
                study={study}
                refetch={allStudiesRefetch}
                onClose={() => setShowEditble(false)}
              />
            </div>
            {addNewExperiment && (
              <ExperimentForm
                setNewPaper={setNewPaper}
                setExperimentToEdit={setExperimentToEdit}
                study={study}
                setAddNewExperiment={setAddNewExperiment}
                refetch={refetch}
              />
            )}
            {experimentToShow && !newPaper && (
              <ExperimentDetails
                experiment={experimentToShow}
                study={study}
                setPaperToShow={setExperimentToShow}
              />
            )}
            {paperToEdit && (
              <ExperimentForm
                setNewPaper={setNewPaper}
                experimentData={paperToEdit}
                setAddNewExperiment={setAddNewExperiment}
                setExperimentToEdit={setExperimentToEdit}
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
