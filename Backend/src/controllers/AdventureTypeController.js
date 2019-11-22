import AdventureType from "../models/AdventureType";

module.exports = {
  async index(req, res) {
    const adventureType = await AdventureType.findAll();
    return res.json(adventureType);
  },
  async store(req, res) {
    const { description } = req.body;

    const adventureType = await AdventureType.create({
      description
    });

    return res.json(adventureType);
  }
};
