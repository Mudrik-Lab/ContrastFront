import * as Yup from "yup";

export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const navHeight = 70;
export const sideWidth = 370;
export const footerHeight = 75;
export const uploadPaperPageTopSection = 112; //h-28
export const uploadPaperUsedHeight = footerHeight + navHeight + 20;

export const fieldClass = "border border-gray-300 rounded-sm p-2 h-10 w-72";
export const numericFieldClass =
  "border border-gray-300 rounded-[4px] p-2 h-[39.2px] w-20";
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
  displaylogo: false,
};
export const isMoblile = screenWidth < 600;

export const interpretationTypes = [
  { label: "Supports", value: "pro" },
  { label: "Challenges", value: "challenges" },
  { label: "Neutral", value: "neutral" },
];
export const concsiousnessOptions = [
  { vlaue: null, label: "" },
  { value: "state", label: "State" },
  { value: "content", label: "Content" },
  { value: "both", label: "Both" },
];
export const reportOptions = [
  { vlaue: null, label: "" },
  { value: "report", label: "Report" },
  { value: "no_report", label: "No Report" },
  { value: "both", label: "Both" },
];
export const theoryDrivenOptions = [
  { vlaue: null, label: "" },
  { value: "driven", label: "Driven" },
  { value: "mentioning", label: "Mentioning" },
  { value: "post-hoc", label: "Post Hoc" },
];

export const statusNumber = {
  ON_PROCCESS: 0,
  APPROVED: 1,
  REJECTED: 2,
  AWAITING: 3,
};
export const studyValidationSchema = Yup.object().shape({
  authors: Yup.array().min(1, "Please select at least one author"),
  year: Yup.date()
    .max(
      new Date().getFullYear(),
      "Year must be current year or less than current year"
    )
    .required("Publication year is required."),
  source_title: Yup.mixed().required("Please select or add source title"),
  countries: Yup.array().min(1, "Please select at least one country"),
  DOI: Yup.string()
    .matches(/^10\./, "Please enter a valid DOI.")
    .required("DOI is required."),
});
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

export const uncontrastParametersOptions = [
  {
    value: "consciousness_measure_phase",
    label: "Consciousness Measure Phase",
  },
  { value: "consciousness_measure_type", label: "Consciousness Measure Type" },
  {
    value: "is_target_same_as_suppressed_stimulus",
    label: "Is Target Same as Suppressed Stimulus",
  },
  { value: "paradigm", label: "Paradigm" },
  { value: "population", label: "Population" },
  { value: "processing_domain", label: "Processing Domain" },
  {
    value: "suppressed_stimuli_category",
    label: "Suppressed Stimuli Category",
  },
  {
    value: "suppressed_stimuli_modality",
    label: "Suppressed Stimuli Modality",
  },
  { value: "suppression_method", label: "Suppression Method" },
  { value: "target_stimuli_category", label: "Target Stimuli Category" },
  { value: "target_stimuli_modality", label: "Target Stimuli Modality" },
  { value: "task", label: "Task" },
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
export const commonBlue = "#159DEA";

export const grayReg = "#999999";
export const azure = "#C2E1F2";
export const flourishRed = "#ED5252";
export const revoltingGreen = "#088515";
export const grayHeavy = "#6D6D6D";
export const grayDisable = "#F2F2F2";
