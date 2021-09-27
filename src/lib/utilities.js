export const isURL = (str) => {
  var pattern = new RegExp("^(https?:\\/\\/)?", "i");
  return str ? pattern.test(str) : false;
};
