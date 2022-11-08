const express = require("express");
const router = new express.Router();
const cors = require("cors");
const Quote = require("../schema/Quote");
router.use(express.json());
router.use(cors());
const passport = require("passport");
router.use(passport.initialize());
require("../passport");

/**
 * @swagger
 * components:
 *  schemas:
 *    Quotes:
 *      type: object
 *      required:
 *        - title
 *        - description
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the quote
 *        title:
 *          type: string
 *          description: The quote title
 *        description:
 *          type: string
 *          description: The quote description
 *      example:
 *        id: ABC_XYZ
 *        title: Friends enemy is your enemy
 *        description: Anonymus
 */
/**
 * @openapi
 * tags:
 *  name: Quotes
 *  description: Protected routes accessed only after JWT authorization.
 */
/**
 * @openapi
 *  /crud/read:
 *   get:
 *     security:            
 *      - bearerAuth: []
 *     tags:
 *      - Quotes
 *     description: Hit to get all quotes.
 *     summary: Get All Quotes
 *     responses:
 *       '200':
 *         description: Got all quotes successfully.
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Quotes'
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 *  /crud/read/{id}:
 *   get:
 *     security:            
 *      - bearerAuth: []
 *     tags:
 *      - Quotes
 *     description: Hit to get particular quote by id.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: The quote id
 *     summary: Get quote
 *     responses:
 *       200:
 *         description: Got quote by id successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Quotes'
 *       404:
 *         description: The Quote was not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @openapi
 *  /crud/create:
 *   post:
 *     security:            
 *      - bearerAuth: []
 *     tags:
 *      -  Quotes
 *     description: Add new quote.
 *     summary: Create quote
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Quotes'
 *     responses:
 *       201:
 *         description: Quote created successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Quotes'
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 *  /crud/update/{id}:
 *   put:
 *     security:            
 *      - bearerAuth: []
 *     tags:
 *      - Quotes
 *     description: Hit to update particular quote by id.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: The quote id
 *     summary: Update quote
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Quotes'
 *     responses:
 *       200:
 *         description: Updated quote by id successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Quotes'
 *       404:
 *         description: The Quote was not found.
 *       500:
 *         description: Internal server error.
 */
/**
 * @swagger
 *  /crud/delete/{id}:
 *   delete:
 *     security:            
 *      - bearerAuth: []
 *     tags:
 *      - Quotes
 *     description: Hit to delete particular quote by id.
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string
 *        required: true
 *        description: The quote id
 *     summary: Delete quote
 *     responses:
 *       200:
 *         description: Deleted quote by successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Quotes'
 *       404:
 *         description: The Quote was not found.
 *       500:
 *         description: Internal server error. 
 */

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
      if(!response) return res.status(404).json({message: "Error",data:"Quote not found"});
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
      if(!response) return  res.status(404).json({message: "Failed",data:"Failed to update quote",});
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
      if(!response) return res.status(404).json({message: "Error",data:"Quote not found"});
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
