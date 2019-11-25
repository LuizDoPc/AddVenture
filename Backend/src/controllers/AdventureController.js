import Adventure from "../models/Adventure";
import User from "../models/User";

module.exports = {
  async index(req, res) {
    const adventures = await Adventure.findAll();

    let response = [];

    for (let adventure of adventures) {
      const user = await User.findByPk(adventure.user_id);
      response.push({
        adventure,
        user
      });
    }
    return res.json(response);
  },
  async store(req, res) {
    const { user_id } = req.params;
    const { title, date, location, description } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) return res.status(400).json({ error: "User not found" });

    if (user.user_type === 1)
      return res
        .status(400)
        .json({ error: "User type not allowed to create adventure" });

    const adventure = await Adventure.create({
      title,
      date,
      location,
      description,
      user_id
    });

    return res.json(adventure);
  },
  async adventures(req, res) {
    const { user_id } = req.params;

    const adventure = findAll({
      where: {
        user_id
      }
    });

    if (!adventure) return res.json([]); // TODO: implement empty array response

    return res.json(adventure);
  }
};
