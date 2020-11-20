const { fetchWrapper } = require("./index");
const { SUBJECT_URL } = require("../../config");

export function fetchCategories() {
  return fetchWrapper(SUBJECT_URL + "/all-categories");
}

export function fetchSubjects(category) {
  return fetchWrapper(SUBJECT_URL + "/category/" + category);
}
