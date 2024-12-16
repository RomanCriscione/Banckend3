import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * /sessions/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register',sessionsController.register);

/**
 * @swagger
 * /sessions/login:
 *   post:
 *     summary: Log in an existing user
 *     description: Log in a user with email and password to receive a JWT token.
 *     responses:
 *       200:
 *         description: Login successful with JWT token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/login',sessionsController.login);

/**
 * @swagger
 * /sessions/current:
 *   get:
 *     summary: Get the current logged-in user
 *     description: Retrieve the currently logged-in user's data.
 *     responses:
 *       200:
 *         description: Current user data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/current',sessionsController.current);

/**
 * @swagger
 * /sessions/unprotectedLogin:
 *   get:
 *     summary: Unprotected login
 *     description: Unprotected login route for testing purposes.
 *     responses:
 *       200:
 *         description: Login successful
 *       500:
 *         description: Internal server error
 */
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);

/**
 * @swagger
 * /sessions/unprotectedCurrent:
 *   get:
 *     summary: Unprotected current user
 *     description: Unprotected route to get current user data.
 *     responses:
 *       200:
 *         description: Current user data
 *       500:
 *         description: Internal server error
 */
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;