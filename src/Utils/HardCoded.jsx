import * as Yup from "yup";
import { alphabetizeByLabels } from "./functions";

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
  displayModeBar: true,
  toImageButtonOptions: {
    format: "svg", // one of png, svg, jpeg, webp
    filename: `${window.location.href}`,
    scale: 1, // Multiply title/legend/axis/canvas sizes by this factor
  },
  displaylogo: false,
  scrollZoom: false,
  doubleClick: "reset",
  showAxisDragHandles: true,
  showAxisRangeEntryBoxes: true,
};
export const xAxisConfig = {
  showgrid: false,
  title: {
    text: "Number of experiments",
    font: { size: 28 },
    standoff: 20,
  },
  zeroline: true,
  side: "top",
  tickfont: {
    size: 20,
    standoff: 50,
  },
};
export const yAxisConfig = {
  yaxis: {
    automargin: true,
    ticks: "outside",
    tickangle: 315,
    tickfont: {
      size: 18,
      standoff: 50,
    },
  },
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
export const parametersOptions = alphabetizeByLabels([
  {
    value: "paradigm_family",
    label: "Paradigm family",
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
    label: "Finding tag",
  },
  {
    value: "finding_tag_family",
    label: "Finding tag family",
  },
  {
    value: "reporting",
    label: "Reporting",
  },
  {
    value: "theory_driven",
    label: "Theory driven",
  },
  {
    value: "task",
    label: "Task",
  },
  {
    value: "stimuli_category",
    label: "Stimulus category",
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
    label: "How was consciousness measured?",
  },
  {
    value: "type_of_consciousness",
    label: "Type of consciousness",
  },
  {
    value: "technique",
    label: "Technique",
  },
  {
    value: "measure",
    label: "Measure",
  },
]);

export const uncontrastParametersOptions = alphabetizeByLabels([
  {
    value: "is_cm_same_participants_as_task",
    label: "Is the measure taken from the same sample as the task?",
  },
  {
    value: "is_performance_above_chance",
    label: "Above-chance performance in the objective measure",
  },
  {
    value: "is_trial_excluded_based_on_measure",
    label: "Trial exclusion based on awareness measure?",
  },
  { value: "modes_of_presentation", label: "Modes of Presentation" },

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
    value: "suppressed_stimuli_sub_category",
    label: "Suppressed Stimuli Sub-Category",
  },
  {
    value: "suppressed_stimuli_modality",
    label: "Suppressed Stimuli Modality",
  },
  { value: "suppression_method", label: "Suppression Method" },
  { value: "target_stimuli_category", label: "Target Stimuli Category" },
  {
    value: "target_stimuli_sub_category",
    label: "Target Stimuli Sub-Category",
  },
  { value: "target_stimuli_modality", label: "Target Stimuli Modality" },
  { value: "task", label: "Task" },
]);
export const continuousBreakdownOptions = alphabetizeByLabels([
  { value: "number_of_stimuli", label: "Number of Stimuli" },
  {
    value: "number_of_suppressed_stimuli",
    label: "Number of Suppressed Stimuli",
  },
  { value: "number_of_target_stimuli", label: "Number of Target Stimuli" },
  {
    value: "outcome_number_of_trials",
    label: "Main Task Number of Trials Per Condition",
  },
  { value: "sample_size_excluded", label: "Sample Size Excluded" },
  { value: "sample_size_included", label: "Sample Size Included" },
  {
    value: "suppressed_stimuli_duration",
    label: "Suppressed Stimuli Duration",
  },
  {
    value: "unconsciousness_measure_number_of_participants_in_awareness_test",
    label: "Number of Participants in the Awareness Test",
  },
  {
    value: "unconsciousness_measure_number_of_trials",
    label: "Awareness Measure Number of Trials",
  },
]);
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
