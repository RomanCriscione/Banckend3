import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockData.js'; 
import bcrypt from 'bcryptjs';
import User from '../dao/models/User.js';

const router = Router();

/**
 * @swagger
 * /mockingusers:
 *   get:
 *     summary: Generate mock users
 *     description: Generate and store mock users in the database.
 *     responses:
 *       200:
 *         description: A list of mock users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/mockingusers', async (req, res) => {
  try {
    const users = generateMockUsers(50); 
    
    
    const usersWithHash = await Promise.all(
      users.map(async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
        return user;
      })
    );

    await User.insertMany(usersWithHash);
    res.json(usersWithHash);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando usuarios', details: error.message });
  }
});

/**
 * @swagger
 * /mockingpets:
 *   get:
 *     summary: Generate mock pets
 *     description: Generate and return mock pets.
 *     responses:
 *       200:
 *         description: A list of mock pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get('/mockingpets', (req, res) => {
  try {
    const pets = generateMockPets(50); 
    res.json(pets); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando mascotas', details: error.message });
  }
});

export default router;
