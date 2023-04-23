export function getRandomColor(numberOfColors) {
  var colors = [];
  for (var i = 0; i < numberOfColors; i++) {
    colors.push(Math.floor(Math.random() * 16777215).toString(16));
  }
  return colors;
}
