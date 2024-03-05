const validatePassword = async (password) => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return new Promise((resolve, reject) => {
    if (!password.match(passwordRegex)) {
      reject(false);
    }
    resolve(true);
  });
};

module.exports = validatePassword;
