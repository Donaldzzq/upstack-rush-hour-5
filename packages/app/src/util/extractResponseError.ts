export const extractResponseError = err => {
  try {
    return err.response.data.message;
  } catch (err) {
    return "Unkown Error Occured";
  }
};
