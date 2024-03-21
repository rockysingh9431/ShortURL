const USER = require("../models/user");
async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await USER.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handleUserLogIn(req, res) {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });

  if (!user) return res.redirect("/login");

  if (user.password === password) return res.redirect("home");
}

module.exports = {
  handleUserSignUp,
  handleUserLogIn,
};
