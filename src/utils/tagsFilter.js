export default (obj, needed) => {
  return Object.keys(obj)
    .filter(key => needed.includes(key))
    .reduce((result, key) => (result[key] = obj[key], result), {});
}
