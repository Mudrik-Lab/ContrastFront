import { colorsArray } from "../components/HardCoded";

export function getRandomColor(numberOfColors) {
  var colors = [];
  for (var i = 0; i < numberOfColors; i++) {
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colors;
}
export function blueToYellow(numColors) {
  const colors = [];
  const startColor = [41, 24, 107]; // deep dark blue
  const midColor = [128, 182, 134]; // light green
  const endColor = [254, 247, 202]; // light yellow

  const numMidColors = Math.ceil(numColors / 2);

  for (let i = 0; i < numMidColors; i++) {
    const r =
      startColor[0] - ((startColor[0] - midColor[0]) / (numMidColors - 1)) * i;
    const g =
      startColor[1] - ((startColor[1] - midColor[1]) / (numMidColors - 1)) * i;
    const b =
      startColor[2] - ((startColor[2] - midColor[2]) / (numMidColors - 1)) * i;
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  const numEndColors = Math.floor(numColors / 2);

  for (let i = 0; i < numEndColors; i++) {
    const r =
      midColor[0] - ((midColor[0] - endColor[0]) / (numEndColors - 1)) * i;
    const g =
      midColor[1] - ((midColor[1] - endColor[1]) / (numEndColors - 1)) * i;
    const b =
      midColor[2] - ((midColor[2] - endColor[2]) / (numEndColors - 1)) * i;
    colors.push(`rgb(${r}, ${g}, ${b})`);
  }

  return colors;
}

export function breakHeadlines(str, chartForLine) {
  let newStr = "";
  let charsCount = 0;
  str.split(" ").map((word) => {
    if (charsCount < chartForLine) {
      newStr = newStr + " " + word;
      charsCount = charsCount + word.length + 1;
    } else {
      newStr = newStr + "<br />" + word;
      charsCount = 0;
    }
  });
  return "<span>" + newStr.slice(1) + "</span>";
}

export function rawTeaxtToShow(text) {
  text = text.replace(/[-_]/g, " ");
  const words = text.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

export function hexToRgba(hexColor) {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}
