export default (obj, needed) => {
  const result = {};
  for (let key in obj) {
    if (needed.includes(obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}
