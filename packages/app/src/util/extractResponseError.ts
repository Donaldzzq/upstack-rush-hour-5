export const extractResponseError = err => {
  try {
    return err.message || err.response.data.message;
  } catch (err) {
    return "Unkown Error Occured";
  }
};
