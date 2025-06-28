const register = async (req, res) => {
  res.send("Register");
};

const login = async (req, res) => {
  res.send("Login");
};


module.exports = { register, login };
