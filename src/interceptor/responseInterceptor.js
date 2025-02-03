const addRespondToResponse = (req, res, next) => {
  res.respond = (data) => {
    res.status(200).send(data);
  };
  next();
};

module.exports = addRespondToResponse;