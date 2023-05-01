import { ReactComponent as ParameterDist } from "../assets/icons/parameter-distribution.svg";
import { ReactComponent as ParameterDist2 } from "../assets/icons/parameter-distribution2.svg";
import { ReactComponent as TheoriesComparison } from "../assets/icons/theories-comparison.svg";
import { ReactComponent as TheoryDriven } from "../assets/icons/theory-driven.svg";
import { ReactComponent as ParameterTheory } from "../assets/icons/parameter&theory.svg";
import { ReactComponent as Trends } from "../assets/icons/trends.svg";
import { ReactComponent as Timing } from "../assets/icons/timing.svg";
import { ReactComponent as Frequencies } from "../assets/icons/frequencies.svg";
import { ReactComponent as Journals } from "../assets/icons/journals.svg";
import { ReactComponent as AnatomicalFindings } from "../assets/icons/anatomical-findings.svg";
import { ReactComponent as WorldMap } from "../assets/icons/consciousness-world-map.svg";

export const tagsOptions = [
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
    label: "Stimuli Category",
  },
  {
    value: "modality",
    label: "Modality",
  },
  {
    value: "consciousness_measure_phase",
    label: "Consciousness Measure Phase",
  },
  {
    value: "consciousness_measure_type",
    label: "Consciousness Measure Type",
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
export const available_techniques_for_timings = [
  { value: "EEG", label: "EEG" },
  { value: "MEG", label: "MEG" },
  { value: "TMS", label: "TMS" },
  { value: "Computational Modelling", label: "Computational Modelling" },
];

export const ABColors = {
  Alpha: "#C2549D",
  Beta: "#EB5A88",
  Gamma: "#EF7576",
  Delta: "#4D3991",
  Theta: "#8949A2",
};
export const paradigmsColors = [
  "rgba(189, 183, 89, 1)",
  "rgba(196, 137, 87, 1)",
  "rgba(202, 83, 90, 1)",
  "rgba(164, 92, 150, 1)",
  "rgba(116, 88, 160, 1)",
  "rgba(73, 107, 155, 1)",
  "rgba(62, 127, 148, 1)",
  "rgba(34, 109, 116, 1)",
  "rgba(66, 153, 134, 1)",
  "rgba(79, 180, 89, 1)",
  "rgba(241, 192, 232,1)",

  "rgba(255, 215, 0, 1)",
  "rgba(240, 128, 128, 1)",
  "rgba(176, 196, 222, 1)",
  "rgba(255, 160, 122, 1)",
];

export const breakdownsShorts = {
  "Global Workspace": "GNW",
  "Integrated Information": "IIT",
  "Higher Order Thought": "HOT",
  "First Order & Predictive Processing": "RPT",
  Other: "Other",
};

export const graphsHeaders = [
  {
    text: "Parameter Distribution Free Queries",
    color: "yellow",
    icon: <ParameterDist />,
    route: "/parameter-distribution-free-queries",
  },
  {
    text: "Theories Comparison",
    color: "orange",
    icon: <TheoriesComparison />,
    route: "theories-comparison",
  },
  {
    text: "Parameter Distribution Bar",
    icon: <ParameterDist2 />,
    color: "pink",
    route: "/parameter-distribution-bar",
  },
  {
    text: "Parameter Distribution Pie",
    icon: <ParameterTheory />,
    color: "lilac",
    route: "/parameter-distribution-pie",
  },
  {
    text: "Trends Across The Years",
    icon: <Trends />,
    color: "purple",
    route: "/across-the-years",
  },
  {
    text: "Theory Driven",
    icon: <TheoryDriven />,
    color: "navyBlue",
    route: "/theory-driven",
  },
  {
    text: "Timing",
    icon: <Timing />,
    color: "darkTeal",
    route: "/timing",
  },
  {
    text: "Frequencies",
    icon: <Frequencies />,
    color: "teal",
    route: "/frequencies",
  },
  // {
  //   text: "Anatomical Findings",
  //   icon: <AnatomicalFindings />,
  //   route: "/",
  // },
  {
    text: "Journals",
    icon: <Journals />,
    color: "lightTeal",
    route: "/journals",
  },
  {
    text: "Consciousness World Map",
    icon: <WorldMap />,
    color: "lightGreen",
    route: "/consciousness-world-map",
  },
];

export const parametersColors = {
  "Stimulus Degradation": "rgba(189, 183, 89, 1)",
  Masking: "rgba(196, 137, 87, 1)",
  Anesthesia: "rgba(202, 83, 90, 1)",
  "Direct Stimulation": "rgba(164, 92, 150, 1)",
  "Attentional Manipulation": "rgba(116, 88, 160, 1)",
  "Disorders of Consciousness": "rgba(73, 107, 155, 1)",
  Expectation: "rgba(62, 127, 148, 1)",
  "Abnormal Contents of Consciousness": "rgba(34, 109, 116, 1)",
  "Competition (Binocular)": "rgba(66, 153, 134, 1)",
  Illusions: "rgba(79, 180, 89, 1)",
  "Cognitive Tasks": "rgba(241, 192, 232,1)",
  Familiarity: "rgba(255, 215, 0, 1)",
  Sedation: "rgba(240, 128, 128, 1)",
  "Case Study": "rgba(176, 196, 222, 1)",
  "Psychedelic Drugs": "rgba(255, 160, 122, 1)",
};
