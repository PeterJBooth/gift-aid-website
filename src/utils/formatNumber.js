function formatNumber(number) {
  if (number == null || number === 0) return "-";

  number = addCommasToNumber(number);
  return "£" + number;
}

function addCommasToNumber(number) {
  if (number == null) return "";

  // return number;
  return Math.round(number)
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
export { formatNumber, addCommasToNumber };
