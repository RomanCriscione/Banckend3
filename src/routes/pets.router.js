import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import uploader from '../utils/uploader.js';

const router = Router();

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     description: Retrieve a list of all pets.
 *     responses:
 *       200:
 *         description: A list of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Internal server error
 */
router.get('/',petsController.getAllPets);

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     description: Create a new pet and store it in the database.
 *     responses:
 *       201:
 *         description: Pet created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/',petsController.createPet);
/**
 * @swagger
 * /pets/withimage:
 *   post:
 *     summary: Create a new pet with an image
 *     description: Create a new pet with an image and store it in the database.
 *     responses:
 *       201:
 *         description: Pet created successfully with an image
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);

/**
 * @swagger
 * /pets/{pid}:
 *   put:
 *     summary: Update a pet by ID
 *     description: Update the details of a pet using the pet ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: The pet ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 */
router.put('/:pid',petsController.updatePet);

/**
 * @swagger
 * /pets/{pid}:
 *   delete:
 *     summary: Delete a pet by ID
 *     description: Delete a pet using the pet ID.
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: The pet ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:pid',petsController.deletePet);

export default router;