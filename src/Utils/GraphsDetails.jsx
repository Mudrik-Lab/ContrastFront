import { ReactComponent as ParameterDist } from "../assets/icons/parameter-distribution.svg";
import { ReactComponent as ParameterDist2 } from "../assets/icons/parameter-distribution2.svg";
import { ReactComponent as TheoriesComparison } from "../assets/icons/theories-comparison.svg";
import { ReactComponent as TheoryDriven } from "../assets/icons/theory-driven.svg";
import { ReactComponent as ParameterTheory } from "../assets/icons/parameter&theory.svg";
import { ReactComponent as Trends } from "../assets/icons/trends.svg";
import { ReactComponent as Timings } from "../assets/icons/timing.svg";
import { ReactComponent as Frequencies } from "../assets/icons/frequencies.svg";
import { ReactComponent as Journals } from "../assets/icons/journals.svg";
import { ReactComponent as AnatomicalFindings } from "../assets/icons/anatomical-findings.svg";
import { ReactComponent as WorldMap } from "../assets/icons/consciousness-world-map.svg";

export const graphsHeaders = [
  {
    text: "Parameter Distribution Free Queries",
    color: "yellow",
    icon: <ParameterDist />,
    tooltip:
      "The graph depicts the distribution of parameter values, according to your specifications.",
    route: "/parameter-distribution-free-queries",
    figureLine:
      "Here, you can use the toolbar on the left to create your own queries of the data, and generate new figures based on your parameters of interest.",
    figureText:
      " Select a specific parameter of interest to see how the experiments in the database distribute over the different levels of that parameter. You can also filter the results according to various parameters. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
  },
  {
    text: "Theories Comparison",
    tooltip:
      "The graph depicts the different distributions of parameters for the four theories separately.",
    color: "orange",
    icon: <TheoriesComparison />,
    route: "theories-comparison",
    figureLine:
      "Here, you can select a specific parameter of interest, and see how the experiments referring to each one of the theories distribute over the different levels of that parameter.",
    figureText:
      "You can choose whether to see this distribution for experiments that supported one or more of these theories or challenged them.You can also filter the results according to consciousness type, reporting technique, and whether the study was theory-driven or not. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
  },
  {
    text: "Parameter Distribution Bar",
    tooltip:
      'The graph depicts the distribution of different parameters for each selected theory, separated to experiments challenging ("Against") and supporting ("Pro") the theory.',
    icon: <ParameterDist2 />,
    color: "pink",
    route: "/parameter-distribution-bar",
    figureLine:
      "Here, you can select a specific theory family and a specific parameter of interest, to explore how experiments in the database that refer to the chosen theory family distribute over the different levels of the chosen parameter.",
    figureText:
      "The results will be shown separately for experiments supporting (blue bars) vs. challenging (red bars) the chosen theory family. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.You can also filter the results according to reporting technique.",
  },
  {
    text: "Parameter Distribution Pie",
    tooltip:
      "The inner circle of the pie chart depicts the distribution of different parameters acorss theories, The outer circle describes the distribution of each inner slice to theories.",
    icon: <ParameterTheory />,
    color: "lilac",
    route: "/parameter-distribution-pie",
    figureLine:
      "Here, you can select a specific parameter of interest, to explore how the different levels of the chosen parameter distribute across the different theories.",
    figureText:
      "The inner circle of the pie describes the distribution of different levels across theories,while the outer circle describes the distribution of the theory families for each inner slice. By clicking on an inner circle slice, you can generate a new pie chart focusing on that category only (reversible by re-clicking on the slice).You can also filter the results according to consciousness type, reporting technique, and ‎whether the study was theory-driven or not.‎ Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
    legendLine:
      "FOT = First order & predictive processing theories, GWT = Global workspace theories, HOT = Higher order theories, IIT = Integrated information theories.",
  },
  {
    text: "Trends Over Time",
    tooltip:
      "The graph depicts the cumulative distribution of experiments according to the selected parameter values over time.",
    icon: <Trends />,
    color: "purple",
    route: "/trends-over-time",
    figureLine:
      "Here, you can select a specific parameter of interest, and see how the experiments in the database distribute over the different levels of that parameter over time.",
    figureText:
      "The plot is a cumulative figure that shows the number of experiments per level at each point in time. You can also filter the results according to consciousness type and reporting technique. Note: This plot is dynamic: by clicking on one of the labels on the right side of the figure, you can hide the data related to the clicked label (reversible by re-clicking on the label). Hovering on each point in time shows you the number of experiments of that feature of interest up until that year. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
  },
  {
    text: "Theory Driven",
    tooltip:
      "The inner circle of the pie chart depicts the distribution of experiments divided into the categories: “Theory-Driven”, “Mentioning” or “Post hoc”",
    icon: <TheoryDriven />,
    color: "navyBlue",
    route: "/theory-driven",
    figureLine:
      "Here, you can see how the experiments in the database distribute with respect to their theoretical motivation: the category 'Theory driven' includes experiments that were a-priory designed to test the predictions of at least one theory.",
    figureText:
      "The category 'Mentioning' includes experiments that mentioned at least one family of theories in the introduction. The category 'Post hoc' includes experiments that only interpreted their results in light of the theories. The outer circle describes the distribution of the interpretations of each experiment in the inner circle slice according to the four families of theories. By clicking on an inner circle slice, you can generate a new pie chart focusing on that category only (reversible by re-clicking on the slice). Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
    legendLine:
      "FOT = First order & predictive processing theories, GWT = Global workspace theories, HOT = Higher order theories, IIT = Integrated information theories.",
  },
  {
    text: "Timings",
    tooltip:
      "The chart depicts the findings in the temporal domain of the experiments in the database.",
    icon: <Timings />,
    color: "darkTeal",
    route: "/timings",
    figureLine:
      "Here, you can plot the time windows over which effects were reported in all experiments in the database that employed a time-resolved technique.",
    figureText:
      "Each horizontal line represents a specific component, colored according to its classification by the authors (see the legend). Darker colors indicate later components. Components for which a time window was given are depicted as a continuous line spanning over the components range. Dots depict components for which only the peak was reported. In this figure, you can select a specific technique/component or multi-select more than one. In addition, you can filter the results according to consciousness type and reporting technique, and theory family. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
    legendLine:
      "To zoom in on a specific time window, simply draw a rectangle with your mouse on the area of interest, and the figure will change accordingly.",
  },
  {
    text: "Frequencies",
    tooltip:
      "The chart depicts the findings in the frequency domain of the experiments in the database.",
    icon: <Frequencies />,
    color: "teal",
    route: "/frequencies",
    figureLine:
      "Here, you can plot the frequencies in which effects were reported in all experiments in the database that employed a time-resolved technique. ",
    figureText:
      "Each horizontal line represents the frequency band reported in a specific experiment, colored according to its classification by the authors (see the legend). Darker colors indicate lower frequencies. Cases in which a specific frequency was reported (e.g., 5Hz), are represented by dots. In this figure, you can select a specific technique or multi-select more than one. You can also filter the results according to consciousness type, reporting technique, and theory family. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
  },
  {
    text: "Anatomical Findings",
    tooltip:
      "The figure depicts the findings in the spatial domain of the experiments in the database which used fMRI.",
    icon: <AnatomicalFindings />,
    color: "lightTeal",
    route: "/anatomical-findings",
    figureLine:
      "Here, you can see the findings in the spatial domain, of the experiments in the database which used fMRI.",
    figureText:
      "Red, yellow, blue, and green activations represent experiments supporting the global workspace theories, integrated information, higher order, and re-entry and predictive processing theories, respectively. The intensity of the color of each activation indicates the relative frequency of the activation in each brain area, within the findings supporting each theory family. Note that this does not include any statistical analysis of the data, just a simple “vote count” of the number of experiments in which a specific area was reported. ",
    legendLine:
      "FOT = First order & predictive processing theories, GWT = Global workspace theories, HOT = Higher order theories, IIT = Integrated information theories.",
  },
  {
    text: "Journals",
    tooltip:
      "The bar chart depicts distribution of experiments according to the journals they were published in.",
    icon: <Journals />,
    color: "lightGreen",
    route: "/journals",
    figureLine:
      "Here, you can see in which journals the experiments in the database for a chosen theory family were reported. ",
    figureText:
      "You can also filter the results according to consciousness type, reporting technique, and also whether the study was theory-driven or not. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories. ",
  },
  {
    text: "Consciousness World Map",
    tooltip:
      "Distribution of the experiments in the database according to nations extracted from author affiliations.",
    icon: <WorldMap />,
    color: "lightGreen",
    route: "/consciousness-world-map",
    figureLine:
      "Here, you can see how the different theories are supported in different countries around the world.",
    figureText:
      " The map presents the distribution of the experiments in the database according to nations extracted from author affiliations. The radius of each concentric circle describes the number of experiments supporting each theory family. You can choose a specific theory family or multi-select many.You can also filter the results according to consciousness type, reporting technique, and also whether the study was theory-driven or not. Using the ‘Minimum number of experiments’ scale you can limit the size of the presented categories.",
  },
];
