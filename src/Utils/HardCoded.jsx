export const screenWidth = window.screen.width;
export const screenHeight = window.screen.height;
export const navHeight = 80;
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

export const AlphaBetaColors = {
  Alpha: "#C2549D",
  Beta: "#EB5A88",
  Gamma: "#EF7576",
  Delta: "#4D3991",
  Theta: "#8949A2",
};

export const available_populations = [
  {
    value: "heathy Adults",
    label: "Heathy Adults",
  },
  {
    value: "patients",
    label: "Patients",
  },
  {
    value: "healthy college students",
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
import Liad from "../assets/images/Liad.jpg";
import Anil from "../assets/images/Anil.jpg";
import Axel from "../assets/images/Axel.jpg";
import LuciaM from "../assets/images/LuciaM.png";
import LucieC from "../assets/images/LucieC.jpg";
import Megan from "../assets/images/Megan.jpeg";
import Ned from "../assets/images/Ned.jpg";
import Steve from "../assets/images/Steve.jpg";

export const foundingBoardBios = [
  {
    name: "Liad Mudrik",
    image: Liad,
    text: "School of Psychological Sciences and Sagol School of Neuroscience,Tel Aviv University.",
    website: "https://mudriklab.tau.ac.il",
  },
  {
    name: "Stephen Fleming",
    image: Steve,
    title: "Professor of Cognitive Neuroscience",
    text: "University College London",
    website: "https://metacoglab.org/",
  },
  {
    name: "Megan Peters",
    image: Megan,
    text: "Department of Cognitive Sciences, University of California Irvine",
    website: "https://faculty.sites.uci.edu/cnclab",
  },
  {
    name: "Anil Seth",
    image: Anil,
    text: "Sussex Centre for Consciousness Science and Canadian Institute for Advanced Research, Program on Brain, Mind, and Consciousness",
    website: "https://www.anilseth.com",
  },
  {
    name: "Axel Cleeremans",
    image: Axel,
    title: "Director",
    text: "Center for Research in Cognition & Neurosciences, Université libre de Bruxelles (BELGIUM)",
    website: "https://axc.ulb.be/",
  },
  {
    name: "Lucie Charles",
    image: LucieC,
    text: "	Department of Psychology, Queen Mary University of London",
    website: "https://sites.google.com/site/luciecharlesneuro/home?pli=1",
  },
  {
    name: "Lucia Melloni",
    image: LuciaM,
    text: "Neural Circuits, Consciousness, and Cognition Research Group, Max Planck Institute for Empirical Aesthetics, Germany Department of Neurology, NYU Grossman School of Medicine, US",
    website:
      "https://www.aesthetics.mpg.de/en/research/research-group-neural-circuits-consciousness-and-cognition.html ",
  },
  {
    name: "Ned Block",
    image: Ned,
    title: "Silver Professor",
    text: "Departments of Philosophy, Psychology, and Center for Neural Science New York University",
    website: "https://www.nedblock.us",
  },
];
