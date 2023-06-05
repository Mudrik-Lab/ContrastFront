export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const navHeight = 70;
export const sideWidth = 370;

export const sideSectionClass =
  "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";

export const isMoblile = screenWidth < 600;

export const parametersOptions = [
  {
    value: "paradigm_family",
    label: "Paradigm Family",
  },
  {
    value: "paradigm",
    label: "Paradigm",
  },
  {
    value: "population",
    label: "Population",
  },
  {
    value: "finding_tag",
    label: "Finding Tag",
  },
  {
    value: "finding_tag_family",
    label: "Finding Tag Family",
  },
  {
    value: "reporting",
    label: "Reporting",
  },
  {
    value: "theory_driven",
    label: "Theory Driven",
  },
  {
    value: "task",
    label: "Task",
  },
  {
    value: "stimuli_category",
    label: "Stimulus Category",
  },
  {
    value: "modality",
    label: "Stimulus modality",
  },
  {
    value: "consciousness_measure_phase",
    label: "When was consciousness measured?",
  },
  {
    value: "consciousness_measure_type",
    label: "how was consciousness measured?",
  },
  {
    value: "type_of_consciousness",
    label: "Type of Consciousness",
  },
  {
    value: "technique",
    label: "Technique",
  },
  {
    value: "measure",
    label: "Measure",
  },
];

export const FrequenciesColors = {
  Delta: "#4D3991",
  Theta: "#8949A2",
  Alpha: "#C2549D",
  Beta: "#EB5A88",
  Gamma: "#EF7576",
};

export const available_populations = [
  {
    value: "healthy_adults",
    label: "Healthy Adults",
  },
  {
    value: "patients",
    label: "Patients",
  },
  {
    value: "Healthy_college_students",
    label: "Healthy College Students",
  },
  {
    value: "non-human",
    label: "Non-human",
  },
  {
    value: "children",
    label: "Children",
  },
  {
    value: "computer",
    label: "Computer",
  },
];
