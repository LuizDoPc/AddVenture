import Subscription from "../models/Subscription";
import User from "../models/User";
import AdventureType from "../models/AdventureType";
import Adventure from "../models/Adventure";

const getAdventureDetails = async subscription => {
  const response = [];

  for (let subs of subscription) {
    const { adventure_type_id, adventure_id } = subs;

    const adventureType = await AdventureType.findByPk(adventure_type_id);
    const adventure = await Adventure.findByPk(adventure_id);

    response.push({
      subscription: subs,
      adventure,
      adventureType
    });
  }
  return response;
};

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
  },
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);
    if (!user) return res.status(400).json({ error: "User not found" });
    if (user.user_type === 0)
      return res
        .status(400)
        .json({ error: "User type does not have subscriptions" });

    const subscription = await Subscription.findAll({
      where: {
        user_id
      },
      include: [
        {
          association: "adventure"
        },
        {
          association: "adventure_type"
        }
      ]
    });

    if (!subscription) return res.json([]); // TODO: implement empty array response

    return res.json(subscription);
  },
  async adventures(req, res) {
    const { adventure_id } = req.params;

    const adventure = await Adventure.findByPk(adventure_id);

    if (!adventure)
      return res.status(400).json({ error: "Adventure not found" });

    const subscription = await Subscription.findAll({
      where: {
        adventure_id
      },
      include: [
        {
          association: "adventure"
        },
        {
          association: "adventure_type"
        }
      ]
    });

    if (!subscription) return res.json([]); // TODO: implement empty array response

    return res.json(subscription);
  }
};
