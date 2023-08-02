import { Text, YoavSelect } from "../../../components/Reusble";

export default function Tasks({
  fieldValue,
  fieldValues,
  index,
  setFieldValues,
  tasksOptions,
}) {
  return (
    <div>
      {fieldValue && (
        <div className="flex gap-2 items-start">
          <div id="field1" className="w-full">
            <Text weight={"bold"} color={"grayReg"}>
              Type
            </Text>
            <YoavSelect
              disabled={fieldValue.id}
              value={fieldValue.type}
              onChange={(value) => {
                const newArray = [...fieldValues];
                newArray[index].type = value;
                setFieldValues(newArray);
              }}
              options={tasksOptions}
            />
          </div>

          <div id="field2" className="w-full">
            <Text weight={"bold"} color={"grayReg"}>
              Description
            </Text>

            <div className="flex gap-2">
              <input
                disabled={fieldValues[index].id}
                type="textarea"
                defaultValue={fieldValue.description}
                rows={4}
                onChange={(e) => {
                  setFieldValues((prev) =>
                    prev.map((item, i) =>
                      i === index
                        ? { ...item, description: e.target.value }
                        : item
                    )
                  );
                }}
                className={`border w-full border-gray-300 rounded-md p-2 ${
                  fieldValues[index].id && "bg-[#F2F2F2] text-gray-400"
                } `}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
