module.exports = asyncFunction => (req, res, next) => {
  try {
    asyncFunction(req, res, next);
  } catch (err) {
    console.log(err.message);
    res
      .status(400)
      .send(err.message)
      .end();
  }
};
