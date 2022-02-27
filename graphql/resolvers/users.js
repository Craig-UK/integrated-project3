const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config.js");
const User = require("../../models/User");

function generateToken(user) {
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if(!valid) {
          throw new UserInputError("Errors", { errors });
      }

      // find user with the given username
      const user = await User.findOne({ username });

      // if no user exists, throw an error
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // compare given password with user's password using bcrypt
      const match = await bcrypt.compare(password, user.password);

      // if passwords are not equal, throw an error
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      // generate a token for the user
      const token = generateToken(user);

      return {
          ...user._doc,
          id: user._id,
          token
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      // if not valid, return errors
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // check if user is already registered
      const user = await User.findOne({ username });

      // if user is already registered, throw an error from Apollo
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      // hash password using bcrypt
      password = await bcrypt.hash(password, 12);

      // create a new user object
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      // save the user to the database
      const res = await newUser.save();

      // create a token for the new user
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
