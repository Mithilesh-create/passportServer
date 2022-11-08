const express = require("express");
const cors = require("cors");
const auth = express();
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
auth.use(express.json());
auth.use(cors());
/**
 * @swagger
 * components:
 *  schemas:
 *    Register:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        username:
 *          type: string
 *          description: User identity
 *        email:
 *          type: string
 *          description: User email address
 *        password:
 *          type: string
 *          description: User password
 *      example:
 *        username: Mithilesh
 *        email: anonymus@mail.com
 *        password: 1234
 */
/**
 * @swagger
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        username:
 *          type: string
 *          description: User identity
 *        email:
 *          type: string
 *          description: User email address
 *        password:
 *          type: string
 *          description: User password
 *      example:
 *        email: anonymus@mail.com
 *        password: 1234
 */
/**
 * @openapi
 * tags:
 *  name: Auth
 *  description: APIs for authorization.
 */
/**
 * @openapi
 *  /:
 *   get:
 *     tags:
 *      - Auth
 *     description: Hit to get hello from backend.
 *     summary: HealthCheck
 *     responses:
 *       '200':
 *         description: Health check api running.
 */
/**
 * @openapi
 *  /register:
 *   post:
 *     tags:
 *      -  Auth
 *     description: Create User.
 *     summary: Create user for authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: User created successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Register'
 *       200:
 *         description: Email exists in database.
 *       500:
 *         description: Internal server error.
 */
/**
 * @openapi
 *  /login:
 *   post:
 *     tags:
 *      -  Auth
 *     description: Login User.
 *     summary: Login user for authentication
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Logged in successfully.
 *         contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *       404:
 *         description: The User was not found.
 *       200:
 *         description: Incorrect credentials.
 *       500:
 *         description: Internal server error.
 */

auth.get("/", (req, res) => {
  res.status(200).json("Hello");
});
auth.post("/register", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const checkUseremail = await User.findOne({ email });
    if (checkUseremail) return res.status(200).send("Email already exists");
    const passwordHashed = hashSync(`${password}`, 10);
    const createNewUser = await User.create({
      username,
      email,
      password: passwordHashed,
    });
    const data = {
      username: createNewUser.username,
      id: createNewUser._id,
    };
    const token = jwt.sign(data, process.env.Secret, { expiresIn: "1d" });
    return res.status(201).json({
      message: "Success",
      data: {
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
auth.post("/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    const checkUseremail = await User.findOne({ email });
    if (!checkUseremail) return res.status(404).send("User does not exist");
    const passwordHashed = compareSync(`${password}`, checkUseremail.password);
    if (!passwordHashed) return res.status(200).send("Incorrect password");

    const data = {
      username: checkUseremail.username,
      id: checkUseremail._id,
    };
    const token = jwt.sign(data, process.env.Secret, { expiresIn: "1d" });
    return res.status(201).json({
      message: "Success",
      data: {
        token: "Bearer " + token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});
module.exports = auth;
