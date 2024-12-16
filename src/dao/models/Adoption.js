import mongoose from 'mongoose'

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       properties:
 *         owner:
 *           type: string
 *           description: The user who adopts the pet
 *         pet:
 *           type: string
 *           description: The pet being adopted
 *       required:
 *         - owner
 *         - pet
 */

const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pets',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const adoptionModel = mongoose.model('Adoption', schema)

export default adoptionModel;
