import User from "../models/User";
import EncryptorService from "../services/EncryptorService";

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async store(req, res) {
    const {
      name,
      email,
      address,
      phone,
      login,
      password,
      document,
      user_type
    } = req.body;
    console.log(req.body)

    const user = await User.create({
      name,
      email,
      address,
      phone,
      login,
      password: EncryptorService.hashPassword(password),
      document,
      user_type
    });

    return res.json(user);
  }
};
