const { Contact } = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };
  if (favorite) {
    query.favorite = favorite;
  }
  const answer = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(answer);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findById(id);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json(answer);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const answer = await Contact.create({ ...req.body, owner });
  res.status(201).json(answer);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json(answer);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const answer = await Contact.findByIdAndRemove(id);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success!" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
