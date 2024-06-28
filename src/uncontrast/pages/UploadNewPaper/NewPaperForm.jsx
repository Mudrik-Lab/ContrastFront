import React, { useEffect, useMemo, useState } from "react";
import ProgressComponent from "./ProgressComponent";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  TooltipExplanation,
  Spacer,
  ToastBox,
  ToastErrorBox,
} from "../../../sharedComponents/Reusble";
import { errorMsgClass, studyValidationSchema } from "../../../Utils/HardCoded";
import MultiSelect from "../../../sharedComponents/SelectField";
import classNames from "classnames";
import ExperimentsBox from "./ExperimentsBox";
import countryList from "react-select-country-list";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { submitStudy } from "../../../apiHooks/getStudies";
import { toast } from "react-toastify";
import { ReactComponent as V } from "../../../assets/icons/white-circle-v.svg";
import ExperimentForm from "./ExperimentsSection/ExperimentForm";
import { ToastError, confirmFunction } from "../../../Utils/functions";
import FinalSubmit from "../../../sharedComponents/FinalSubmit";
import getUncontrastConfiguration from "../../../apiHooks/getUncontrastConfiguration";
import { createNewAuthor } from "../../../apiHooks/createNewAuthor";

export default function NewPaperForm({
  setAddNewPaper,
  setNewPaper,
  addNewExperiment,
  setAddNewExperiment,
  refetch,
}) {
  const [title, setTitle] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [addExperiments, setAddExperiments] = useState(false);
  const [study, setStudy] = useState(false);
  const [authorsOptions, setAuthorOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([]);
  const [authorsError, setAuthorsError] = useState(false);
  const isUncontrast = true;

  const {
    data: extraConfig,
    isSuccess: extraConfigSuccess,
    refetch: extraConfigRefetch,
  } = useQuery([`more_configurations`], getUncontrastConfiguration);

  const journals = extraConfig?.data.existing_journals.map((journal) => ({
    value: journal,
    label: journal,
  }));

  const authorsList = extraConfig?.data.available_authors.map((author) => ({
    value: author.id,
    label: author.name,
  }));
  useEffect(() => {
    setAuthorOptions(authorsList);
  }, [extraConfig]);

  const handleNewAuthor = async (authorName) => {
    try {
      setIsLoading(true);
      const res = await createNewAuthor(authorName, isUncontrast);
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
    DOI: "",
    source_title: "",
    countries: [],
    authors_key_words: [],
    year: "",
    is_author_submitter: false,
  };

  const handleSubmit = async (values) => {
    if (!value.length) {
      setAuthorsError("Please select at least one author");
      return;
    } else {
      setAuthorsError(false);
    }
    if (values.source_title?.value) {
      try {
        const res = await submitStudy({
          isUncontrast,
          title,
          year: values.year,
          authors: value.map((author) => author.value),
          countries: values.countries,
          DOI: values.DOI,
          source_title: values.source_title?.value,
          is_author_submitter: values?.is_author_submitter,
        });

        if (res.status === 201) {
          setAddExperiments(true);
          setStudy(res.data);
          refetch();
          toast.success(
            <ToastBox
              headline={"Success"}
              text={"You can now add the experiments details "}
            />
          );
        }
      } catch (e) {
        ToastError(e);
      }
    }
  };
  const countryOption = useMemo(() => countryList().getData(), []);

  const exitThruoghConfirm = (
    addExperiments,
    setAddNewPaper,
    title,
    refetch
  ) => {
    return () => {
      addExperiments
        ? setAddNewPaper(false)
        : confirmFunction({
            paperName: title,
            clickDelete: () => {
              setAddNewPaper(false);
              refetch();
            },
            question:
              "Would you like to Exit this screen before saving the study",
            confirmButton: "Yes, Exit!",
          });
    };
  };
  return (
    <div>
      <ProgressComponent
        status={"New Paper"}
        paperNmae={nameSubmitted}
        // experiment={experiment}
      />
      <Spacer height={10} />
      <div className="flex justify-between h-full ">
        <div className="pl-2 w-1/2 relative h-full">
          {addNewExperiment && (
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-60 z-20"></div>
          )}
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
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={studyValidationSchema}>
            {({ dirty, isValid, setFieldValue }) => (
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
                        className="border border-grayFrame p-1.5 w-full text-base rounded-md"
                        disabled={addExperiments}
                      />

                      <TooltipExplanation
                        text={""}
                        tooltip={
                          "Enter the paper’s DOI (e.g. 10.1038/s41562-021-01284-5"
                        }
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
                        className="border border-grayFrame p-1.5 w-full text-base rounded-md"
                        disabled={addExperiments}
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
                        aria-label="Select authors"
                        isMulti
                        isClearable
                        isDisabled={addExperiments}
                        isLoading={isLoading}
                        onCreateOption={handleNewAuthor}
                        onChange={(v) => setValue(v)}
                        placeholder="Select or Add Authors"
                        className=" w-full text-base rounded-md"
                        options={authorsOptions}
                        value={value}
                      />
                      <TooltipExplanation
                        text={""}
                        tooltip={
                          "Start typing the author’s last name and choose from the list below. If the author’s name does not appear in the list, add it manually following this format: LAST_NAME PRIVATE_NAME_INITIALS; for example, Sanchez G. "
                        }
                      />{" "}
                    </div>
                    {authorsError && (
                      <Text className={errorMsgClass}>{authorsError}</Text>
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
                    <Text weight={"bold"} color={"grayReg"}>
                      Journal
                    </Text>
                    <div className="flex items-center gap-2">
                      <CreatableSelect
                        aria-label="Select jurnal"
                        name="source_title"
                        id="source_title"
                        isMulti={false}
                        onChange={(v) => setFieldValue("source_title", v)}
                        placeholder="Select journal"
                        isClearable={true}
                        options={journals}
                        isDisabled={addExperiments}
                        className=" w-full text-base rounded-md"
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
                        aria-label="Select countries"
                        isDisabled={addExperiments}
                        onChange={(v) => {
                          setFieldValue(
                            "countries",
                            v.map((country) => country.value)
                          );
                        }}
                        placeholder="Add Countries"
                        isMulti={true}
                        component={MultiSelect}
                        options={countryOption}
                        className=" w-full text-base rounded-md"
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

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={!(isValid && dirty) || addExperiments}
                    className="bg-blue px-4 py-2 text-lg font-bold text-white rounded-full flex items-center gap-2 disabled:bg-grayLight disabled:text-grayHeavy">
                    <V />
                    Save Paper
                  </Button>
                  <button
                    type="button"
                    onClick={exitThruoghConfirm(
                      addExperiments,
                      setAddNewPaper,
                      title,
                      refetch
                    )}
                    className="font-bold">
                    {addExperiments ? "Close Paper" : "Exit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <Spacer height={20} />
          {addExperiments && (
            <div>
              <ExperimentsBox
                experiments={study?.experiments?.map((experiment, index) => ({
                  ...experiment,
                  title: `Experiment #${index + 1}`,
                }))}
                isExperiment={true}
                showEditble={true}
                setNewPaper={setNewPaper}
                addNewExperiment={addNewExperiment}
                setAddNewExperiment={setAddNewExperiment}
              />
            </div>
          )}
          {study && (
            <FinalSubmit
              study={study}
              refetch={refetch}
              onClose={() => setAddNewPaper(false)}
            />
          )}
        </div>

        {addNewExperiment && study && (
          <ExperimentForm
            setNewPaper={setNewPaper}
            setExperimentToEdit={setStudy}
            study={study}
            setAddNewExperiment={setAddNewExperiment}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
}
