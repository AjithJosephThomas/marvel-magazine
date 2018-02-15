export const paramsToSubStr = query => {
  let subStr = "";

  if (query) {
    const keys = Object.keys(query);
    for (var i in keys) {
      const key = keys[i];
      subStr += `&${key}=${query[key]}`;
    }
  }
  return subStr;
};
