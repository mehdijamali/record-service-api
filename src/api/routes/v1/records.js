/* eslint-disable max-len */
const express = require('express');
const { validate } = require('express-validation');
const recordController = require('../../controllers/record.controller');
const { getRecords } = require('../../validations/record.validation');

const router = express.Router();

router.route('/').post(validate(getRecords), recordController.get);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Fetch records
 */

/**
 * @swagger
 * /records:
 *   post:
 *     tags: [Records]
 *     summary: Fetches the records.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 description: The start date value in ISO 8601 format..
 *                 example: "2016-01-26"
 *               endDate:
 *                 type: string
 *                 description: The end date value tin ISO 8601 format..
 *                 example: "2018-02-02"
 *               minCount:
 *                 type: integer
 *                 description: The minimum count value indicating the minimum value of sum of each record's count values.
 *                 example: 2700
 *               maxCount:
 *                 type: integer
 *                 description: The maximum count value indicating the maximum value of sum of each record's count values.
 *                 example: 3000
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  code:
 *                    type: integer
 *                    description: Indicates the operation's status.
 *                    value: 0
 *                  msg:
 *                    type: string
 *                    default: Success
 *                  records:
 *                    type: array
 *                    items:
 *                     type: object
 *                     properties:
 *                        key:
 *                          type: string
 *                          example: TAKwGc6Jr4i8Z487
 *                          description: The unique string key value
 *                        createdAt:
 *                          type: string
 *                          example: 2017-01-28T01:22:14.398Z
 *                          description: The creation time of the record.
 *                        totalCount:
 *                          type: integer
 *                          example: 2800
 *                          description: shows sum of the integer values inside the count array of the DB record field.
 *       "400":
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   default: 400
 *                 msg:
 *                   type: string
 *       "500":
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   default: 500
 *                 msg:
 *                   type: string
 */
