const Journal = require("../models/Journal");

exports.createJournal = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const journal = await Journal.create({ title, content, userId });
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: "Error creating journal entry", error });
  }
};
