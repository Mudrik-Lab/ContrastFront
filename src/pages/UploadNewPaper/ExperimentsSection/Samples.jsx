import { Field, Form, Formik } from "formik";
import { ExpandingBox, Text } from "../../../components/Reusble";
import Select from "react-select";
import { useState } from "react";
import { ReactComponent as AddField } from "../../../assets/icons/add-field-icon.svg";
import { ReactComponent as Trash } from "../../../assets/icons/trash.svg";
import { addFieldToexperiment } from "../../../apiHooks/createExperiment";
import { deleteExperimentsSample } from "../../../apiHooks/deleteExperiment";

export default function Samples({
  populations,
  experiment_pk,
  study_pk,
  disabled,
}) {
  const [count, setCount] = useState(0);
  const [samplesValues, setSamplesValues] = useState([1]);
  const [sampleId, setSampleId] = useState([]);

  const initialValues = {
    sample: { type: "", total_size: "", size_included: "", id: "" },
  };

  const handleSubmit = async (values, index) => {
    console.log(index);
    try {
      const res = await addFieldToexperiment({
        experiment_pk,
        study_pk,
        field: values.sample,
        field_name: "samples",
      });
      if (res.status === 201) {
        setSampleId([...sampleId, { index: index, sample_id: res.data.id }]);
        console.log(sampleId);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteSampleField = async (index) => {
    const id = sampleId.find((x) => x.index === index).sample_id;
    console.log(id);
    try {
      const res = await deleteExperimentsSample({
        study_pk,
        experiment_pk,
        id: id,
      });
      if (res.status === 204) {
        console.log(res);
        setSamplesValues(samplesValues.slice(0, -1));
        toast.success(
          <ToastBox headline={"Success"} text={"Sample was deleted"} />
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ExpandingBox disabled={disabled} headline={"Samples"}>
      {samplesValues.map((_, index) => (
        <Formik key={index} initialValues={initialValues}>
          {({
            onSubmit,
            isSubmitting,
            dirty,
            isValid,
            values,
            setFieldValue,
          }) => (
            <Form className="flex flex-col gap-2">
              <div
                key={index}
                className="flex gap-2 items-start  border border-blue border-x-4 p-2 rounded-md">
                <div className="w-4">
                  <Text weight={"bold"} color={"blue"}>
                    {index + 1}
                  </Text>
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Type
                  </Text>
                  <Select
                    id={`sample.type`}
                    name={`sample.type`}
                    onChange={(v) => setFieldValue(`sample.type`, v.value)}
                    options={populations}
                  />
                </div>
                <div>
                  <Text weight={"bold"} color={"grayReg"}>
                    Included
                  </Text>
                  <Field
                    type="number"
                    id={`sample.size_included`}
                    name={`sample.size_included`}
                    className="border border-gray-300 rounded-md p-2 h-10 w-16"
                  />
                </div>

                <div className="">
                  <Text weight={"bold"} color={"grayReg"}>
                    Total
                  </Text>

                  <div className="flex gap-2">
                    <Field
                      type="number"
                      id={`sample.total_size`}
                      name={`sample.total_size`}
                      className="border border-gray-300 rounded-md p-2 h-10 w-12"
                    />
                    <button
                      type="button"
                      onClick={() => handleSubmit(values, index)}
                      disabled={false}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_1221_7195)">
                          <path
                            d="M10.7533 5.34351L7.45445 9.54666L5.56082 7.65212L5.56093 7.65201L5.55443 7.64596C5.36486 7.46932 5.11413 7.37315 4.85507 7.37772C4.596 7.38229 4.34882 7.48724 4.1656 7.67046C3.98238 7.85368 3.87743 8.10086 3.87286 8.35993C3.86829 8.61899 3.96446 8.86972 4.1411 9.05929L4.14098 9.0594L4.14719 9.0656L6.79319 11.7126L6.79338 11.7128C6.88843 11.8077 7.0016 11.8824 7.12616 11.9326C7.25072 11.9828 7.38411 12.0074 7.51838 12.0049C7.65264 12.0024 7.78503 11.9729 7.90765 11.9181C8.03026 11.8634 8.14059 11.7845 8.23205 11.6861L8.2384 11.6793L8.24422 11.672L12.2296 6.6903C12.4057 6.50263 12.5028 6.25412 12.5004 5.99644C12.4979 5.73468 12.3929 5.48434 12.2079 5.29916L12.1346 5.22586H12.1248C12.0487 5.16502 11.9639 5.11551 11.873 5.07906C11.7483 5.02898 11.6147 5.00458 11.4802 5.00732C11.3458 5.01006 11.2133 5.03988 11.0907 5.095C10.968 5.15012 10.8578 5.2294 10.7665 5.32811L10.7596 5.33554L10.7533 5.34351ZM15.75 8.50586C15.75 10.5613 14.9335 12.5325 13.4801 13.9859C12.0267 15.4393 10.0554 16.2559 8 16.2559C5.94457 16.2559 3.97333 15.4393 2.51992 13.9859C1.06652 12.5325 0.25 10.5613 0.25 8.50586C0.25 6.45043 1.06652 4.47919 2.51992 3.02578C3.97333 1.57238 5.94457 0.755859 8 0.755859C10.0554 0.755859 12.0267 1.57238 13.4801 3.02578C14.9335 4.47919 15.75 6.45043 15.75 8.50586Z"
                            fill={false ? "#999999" : "#66BFF1"}
                          />
                        </g>
                      </svg>
                    </button>
                    {index === samplesValues.length - 1 && (
                      <button
                        type="button"
                        disabled={false}
                        onClick={() => {
                          handleDeleteSampleField(index);
                        }}>
                        <Trash />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ))}
      <div className="w-full flex  justify-center">
        <button
          type="button"
          disabled={false}
          onClick={() => setSamplesValues([...samplesValues, ""])}>
          <AddField />{" "}
        </button>
      </div>
    </ExpandingBox>
  );
}