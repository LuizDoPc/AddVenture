import Subscription from "../models/Subscription";
import User from "../models/User";
import AdventureType from "../models/AdventureType";
import Adventure from "../models/Adventure";

module.exports = {
  async store(req, res) {
    const { user_id } = req.params;
    const { adventure_type_id, adventure_id } = req.body;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.user_type === 0)
      return res
        .status(400)
        .json({ error: "User type not allowed to subscribe to adventure" });

    const adventureType = await AdventureType.findByPk(adventure_type_id);
    if (!adventureType)
      return res.status(400).json({ error: "Adventure type not found" });

    const adventure = await Adventure.findByPk(adventure_id);
    if (!adventure)
      return res.status(400).json({ error: "Adventure not found" });

    const subscription = await Subscription.create({
      user_id,
      adventure_id,
      adventure_type_id
    });

    return res.json(subscription);
  }
};
