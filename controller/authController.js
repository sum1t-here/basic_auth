const userModel = require("../model/userSchema");

const signup = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(name, email, password, confirmPassword);

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is required",
    });
  }

  const validEmail = emailValidator.validate(email);

  if (!valid) {
    return res.status(400).json({
      success: false,
      message: "Enter valid email",
    });
  }

  if (password != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password doesn't match",
    });
  }
  try {
    const userInfo = userModel(req.body);

    const result = await userInfo.save();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exit with email-id",
      });
    }
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Every field is mandatory",
    });
  }

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user || user.password !== password) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credential",
    });
  }
  try {
    const token = user.jwtToken();
    user.password = undefined;

    const cookieOption = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };

    res.cookie("token", token, cookieOption);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  signin,
};
