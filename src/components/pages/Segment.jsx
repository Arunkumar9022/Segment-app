import React, { useState } from "react";
import Select from "react-select";
import "../../App.css";

const initialSchemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];

function Segment() {
  const [showModal, setShowModal] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [schemaOptions, setSchemaOptions] = useState(initialSchemaOptions);

  const handleAddSchema = () => {
    if (selectedOption) {
      setSelectedSchema([...selectedSchema, selectedOption]);
      setSchemaOptions(
        schemaOptions.filter((option) => option.value !== selectedOption.value)
      );
      setSelectedOption(null);
    }
  };

  const handleRemoveSchema = (schemaValue) => {
    const updatedSelectedSchema = selectedSchema.filter(
      (schema) => schema.value !== schemaValue
    );
    const removedSchema = selectedSchema.find(
      (schema) => schema.value === schemaValue
    );

    if (removedSchema) {
      setSchemaOptions([...schemaOptions, removedSchema]);
      setSelectedSchema(updatedSelectedSchema);
    }
  };

  const availableSchemaOptions = initialSchemaOptions.filter(
    (option) =>
      !selectedSchema.find((selected) => selected.value === option.value)
  );

  const handleSaveSegment = async () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchema.reduce((acc, schema) => {
        acc[schema.value] = schema.label;
        return acc;
      }, {})
    };

    try {
      const webhookURL =
        "https://webhook.site/5a639428-6a46-4484-a57d-248fa86718b7";
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(segmentData)
      });

      if (response.ok) {
        console.log("Segment saved:", segmentData);
      } else {
        console.error("Failed to save segment.");
      }
    } catch (error) {
      console.error("Error saving segment:", error);
    }

    setSegmentName("");
    setSelectedOption(null);
  };

  return (
    <div className="App">
      <button onClick={() => setShowModal(true)}>Save Segment</button>

      {showModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-content">
              <h2>Create Segment</h2>
              <label>Segment Name</label>
              <input
                type="text"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />

              <label>Add Schema to Segment</label>
              <Select
                options={availableSchemaOptions}
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                isSearchable
                placeholder="Select schema..."
              />
              <button onClick={handleAddSchema}>+ Add new schema</button>

              <div className="selected-schemas">
                {selectedSchema.map((schema, index) => (
                  <div key={index} className="selected-schema">
                    {schema.label}{" "}
                    <button
                      onClick={() => handleRemoveSchema(schema.value)}
                      className="remove-schema"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <button onClick={handleSaveSegment}>Save Segment</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Segment;
