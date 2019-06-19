/* eslint-disable import/no-unused-modules */
export function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

export function cleanString(string) {
  return string.replace(/\W/g, '').toLowerCase();
}

export function toUrlCase(string) {
  return string
    .replace(' ', '-')
    .replace(/\W/g, '')
    .toLowerCase();
}

export function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}
