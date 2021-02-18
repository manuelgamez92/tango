const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const tradeModel = require("../models/trades");
const db = mongoose.connect(
  "mongodb+srv://manuel:TonkyAbril*@cluster0.cfwm0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

router.get("/", async (req, res) => {
  try {
    let trades = null;
    if (req.params.user_id && req.params.trade) {
      trades = await tradeModel
        .find({
          user_id: { $eq: req.params.user_id },
          trade: { $eq: req.params.trade },
        })
        .sort({ id: -1 });
      res.status(200).json(trades);
    } else if (req.params.user_id) {
      trades = await tradeModel
        .find({
          user_id: { $eq: req.params.user_id },
        })
        .sort({ id: -1 });
    } else if (req.params.trade) {
      trades = await tradeModel
        .find({
          trade: { $eq: req.params.trade },
        })
        .sort({ id: -1 });
    } else {
      trades = await tradeModel.find({}).sort({ id: -1 });
    }
    if (trades.length > 0) {
      res.status(200).json(trades);
    } else {
      res.status(200).json({ message: "Not matched" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const idTrade = req.params.id;
  try {
    const trade = await tradeModel.findOne({
      id: { $eq: idTrade },
    });
    if (trade) {
      res.status(200).json(trade);
    } else {
      res
        .status(404)
        .send("ID not found");
    }
  } catch (err) {}
});

router.post("/post", async (req, res) => {
  try {
    if (Number(req.body.shares) < 0 || Number(req.body.shares) > 100) {
      res.status(404).json({
        status: "error",
        error: "Share range is invalid. It must be in range [1,100]",
      });
    }
    if (
      req.body.type.trim().toLowerCase() !== "buy" &&
      req.body.type.trim().toLowerCase() !== "sell"
    ) {
      res.status(404).json({
        status: "error",
        error: "Type data is invalid.",
      });
    } else {
      const count = await tradeModel.find({}).count();
      const idd = count + 1;

      const idTrade = new tradeModel({
        id: idTrade,
        type: req.body.type,
        user_id: req.body.user_id,
        symbol: req.body.simbol,
        shares: req.body.shares,
        price: req.body.price,
        timestamp: req.body.timestamp,
      });
      newPost.save((err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res
            .status(201)
            .json({ message: "Trade data inserted correctly", data });
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/", async (req, res) => {
  res.status(405).json({ message: "Not authorized" });
});

router.delete("/", async (req, res) => {
  res.status(405).json({ message: "Not authorized" });
});

module.exports = router;
