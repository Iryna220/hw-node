const express = require("express");
const ctrl = require("../../controllers/contacts");
const { schemas } = require("../../models/contacts");
const { validateBody, isValidId, authenticate } = require("../../middelware");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.schemaValidation),
  ctrl.add
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.schemaValidation),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
