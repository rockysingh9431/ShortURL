const jwt = require("jsonwebtoken");
const SECRET = "RockySingh";
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user._email,
      role: user.role,
    },
    SECRET
  );
}
function getUser(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = { getUser, setUser };
