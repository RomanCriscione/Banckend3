import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';
import adoptionModel from '../dao/models/Adoption.js'

const router = Router();

/**
 * @swagger
 * /adoptions:
 *   get:
 *     summary: Get all adoptions
 *     description: Retrieve a list of all adoptions.
 *     responses:
 *       200:
 *         description: A list of adoptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 *       500:
 *         description: Internal server error
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /adoptions/{aid}:
 *   get:
 *     summary: Get an adoption by ID
 *     description: Retrieve an adoption using the provided adoption ID.
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         description: The adoption ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single adoption
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: Adoption not found
 *       500:
 *         description: Internal server error
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * /adoptions/{uid}/{pid}:
 *   post:
 *     summary: Create an adoption
 *     description: Create a new adoption by linking a user and a pet.
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         description: The pet ID
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Adoption created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
