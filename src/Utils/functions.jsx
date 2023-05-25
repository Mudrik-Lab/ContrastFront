export function getRandomColor(numberOfColors) {
  var colors = [];
  for (var i = 0; i < numberOfColors; i++) {
    colors.push("#" + Math.floor(Math.random() * 16777215).toString(16));
  }
  return colors;
}
export function blueToYellow(numColors) {
  const colors = [];
  const startColor = [254, 247, 202]; // light yellow 
  const midColor = [100, 200, 200]; // light green
  const endColor = [41, 24, 107]; // deep dark blue

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

export function rawTextToShow(text) {
  text = text.replace(/[-_]/g, " ");
  const words = text.split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(" ");
}

export function showTextToRaw(text) {
  const words = text.split(" ");
  const rawWords = words.map(
    (word) => word.charAt(0).toLowerCase() + word.slice(1)
  );
  return rawWords.join("_");
}
export function breakLongLines(text) {
  const words = text.split(" ");
  let line = "";
  const lines = words.map((word, index) => {
    if (line.length + word.length > 10) {
      line = word;
      return `<br />${line}`;
    } else {
      line += (index > 0 ? " " : "") + word;
      return line;
    }
  });
  return lines.join(" ");
}

export function hexToRgba(hexColor) {
  const hex = hexColor?.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export function fitColorPerLabel(data) {
  console.log(data);
}

export function fixArraytoURL(arr, name) {
  const queriesArr = arr?.map((item) => "&" + name + "=" + item.value);
  const urlString = queriesArr?.join("");
  return urlString;
}

export function buildUrl(pageName, paramName, value, navigate) {
  const queryParams = new URLSearchParams(location.search);
  queryParams.set(paramName, value);
  navigate("/" + pageName + "?" + queryParams.toString());
}

export function buildUrlForMultiSelect(e, paramName, searchParams, navigate) {
  const selectedValues = Array.from(e, (option) => option);
  const queryParams = new URLSearchParams(searchParams.toString());
  queryParams.delete(paramName);
  selectedValues.forEach((value) => {
    queryParams.append(paramName, value.value);
  });
  navigate(`?${queryParams.toString()}`);
}
