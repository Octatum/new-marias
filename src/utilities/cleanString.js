function cleanString(string) {
  return string.replace(/\W/g, '').toLowerCase();
}

export default cleanString;
