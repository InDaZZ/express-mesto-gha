const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.message === 'Validation failed') {
    res.status(401)
      .send({
        message: err.message,
      });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'Ошибка на сервере' : message,
    });
  next();
};
module.exports = errorHandler;