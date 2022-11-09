const express = require("express");
const router = new express.Router();
const cors = require("cors");
const Quote = require("../schema/Quote");
router.use(express.json());
router.use(cors());
const passport = require("passport");
router.use(passport.initialize());
require("../passport");

router.get(
  "/read",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Quote.find();
      return res.status(200).json({
        message: "Success",
        response,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
);
router.get(
  "/read/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Quote.findById({ _id: req.params.id });
      if (!response)
        return res
          .status(404)
          .json({ message: "Error", data: "Quote not found" });
      return res.status(200).json({
        message: "Success",
        response,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
);
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Quote.create({
        title: req.body.title,
        description: req.body.description,
      });
      return res.status(201).json({
        message: "Success",
        response,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
);
router.put(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Quote.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body?.title,
          description: req.body?.description,
        },
        { new: true }
      );
      if (!response)
        return res
          .status(404)
          .json({ message: "Failed", data: "Failed to update quote" });
      return res.status(200).json({
        message: "Success",
        response,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
);
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await Quote.findByIdAndDelete({ _id: req.params.id });
      if (!response)
        return res
          .status(404)
          .json({ message: "Error", data: "Quote not found" });
      return res.status(200).json({
        message: "Success",
        response,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }
);

module.exports = router;
