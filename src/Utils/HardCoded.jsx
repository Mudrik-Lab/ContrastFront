export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const navHeight = 70;
export const sideWidth = 370;
export const fieldClass = "border border-gray-300 rounded-sm p-2 h-10 w-72";
export const sideSectionClass =
  "w-full border-b border-grayReg py-5 flex flex-col items-center gap-3 ";
export const errorMsgClass = "text-red-500 text-sm mt-1 text-center";
export const plotConfig = {
  modeBarButtonsToRemove: ["pan", "select", "lasso", "autoscale2d"],
  scrollZoom: false,
  displayModeBar: true,
  toImageButtonOptions: {
    format: "svg", // one of png, svg, jpeg, webp
    filename: `${window.location.href}`,
    scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
  },
  // modeBarButtonsToAdd: [
  //   {
  //     name: "Download plot as svg",
  //     icon: {
  //       width: 20,
  //       height: 20,
  //       path: "M12 22L3 13h5V3h8v10h5l-9 9z",
  //     },
  //     click: handleDownloadSVG,
  //   },
  // ],
  displaylogo: false,
};
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
