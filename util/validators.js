module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword,
  first_name,
  last_name,
  course,
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty!";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty!";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address!";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty!";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match!";
  }
  if (first_name.trim() === "") {
    errors.first_name = "Firstname must not be empty!";
  }
  if (last_name.trim() === "") {
    errors.last_name = "Lastname must not be empty!";
  }
  if (course.trim() === "") {
    errors.course = "Course must not be empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty!";
  }

  if (password === "") {
    errors.password = "Password must not be empty!";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
