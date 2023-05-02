const express = require("express");
const itemsController = require("../controller/itemsController");

const router = express.Router();

router.get("/", itemsController.getItems);
router.post("/", itemsController.addItem);
router.delete("/:id", itemsController.deleteItem);

router.patch("/:id", itemsController.updateItem);

module.exports = router;
