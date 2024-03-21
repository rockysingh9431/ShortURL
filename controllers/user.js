const USER = require("../models/userSchema");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await USER.create({
    name,
    email,
    password,
  });
  return res.redirect("/login");
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email, password });

  if (!user) return res.redirect("/login");

  // const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}
module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
