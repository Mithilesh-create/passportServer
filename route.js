/**
 * @openapi
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
 * @openapi
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
/**
 * @openapi
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
 * @openapi
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
 * @openapi
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
 * @openapi
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