class MyHelper {
  static resHandler = (res, statusCode, apiStatus, data, message) => {
    res.status(statusCode).send({
      apiStatus,
      data,
      message,
    });
  };

  static randomString() {
    return Math.random().toString(36).slice(-10);
  }
}
module.exports = MyHelper;
