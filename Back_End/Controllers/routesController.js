const dbSchema = require("../Schema/registerSchema");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  return res.status(200).send("hello welcome bro");
};

const blog_db = async (req, res) => {
  try {
    const data = await dbSchema.find();
    res.status(200).send(data);
  } catch (error) {
    console.error("Test failed", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

const register = async (req, res) => {
  try {
    const userData = req.body;
    const { email } = req.body;
    const ExistingUser = await dbSchema.findOne({ email });
    if (!ExistingUser) {
      const newUser = new dbSchema(userData);
      await newUser.save();
      return res.status(200).send({ message: "User registered successfully" });
    }
    res.status(400).send({ message: "Email aready existes" });
  } catch (error) {
    return res.status(400).send({ message: "Registeration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ExistingUser = await dbSchema.findOne({ email });
    // console.log(ExistingUser)
    if (ExistingUser) {
      const decryptedPass = await bcrypt.compare(
        password,
        ExistingUser.password
      );
      if (decryptedPass && email == ExistingUser.email) {
        res.status(200).send({
          message: "Login Succesfull",
          token: await ExistingUser.genJWTtoken(),
          user_id: ExistingUser._id.toString(),
        });
      } else {
        res.status(401).send({ message: "invalid Username or Password" });
      }
    } else {
      // console.log("user not found");
      res.status(401).send({ message: "user not found" });
    }
  } catch (error) {
    window.alert("error");
    res.status(400).send({ message: "Login failed" });
  }
};

module.exports = { home, register, login, blog_db };