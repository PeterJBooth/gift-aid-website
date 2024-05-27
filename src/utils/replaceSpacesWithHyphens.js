const replaceSpacesWithHyphens = (string) => {
  return string.replace(/\s+/g, "-").toLowerCase();
};

export { replaceSpacesWithHyphens };
