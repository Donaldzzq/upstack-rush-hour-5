export const extractResponseError = err => {
  try {
    return err.response.data.message || err.message;
  } catch (err) {
    return "Unkown Error Occured";
  }
};
