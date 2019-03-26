const bcrypt = require("bcryptjs");
const User = require("../../Models/user");

module.exports = {
  createUser: async args => {
    try {
      const userr = await User.findOne({ email: args.userInput.email });

      if (userr) {
        throw new Error("User already exists");
      }
      const pass = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: pass
      });
      const res = await user.save();

      return res;
    } catch (err) {
      throw err;
    }
  }
};
