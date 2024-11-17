import { Router } from 'express';
import bcrypt from 'bcryptjs';
import User from '../dao/models/User.js';
import Pet from '../dao/models/Pet.js';
import { faker } from '@faker-js/faker';

const router = Router();


router.get('/mockingusers', async (req, res) => {
  try {
    const users = [];
    for (let i = 0; i < 50; i++) {
      const passwordHash = await bcrypt.hash('coder123', 10);
      const role = Math.random() < 0.5 ? 'user' : 'admin';
      const user = {
        first_name: faker.person.firstName(), 
        last_name: faker.person.lastName(),    
        email: faker.internet.email(),
        password: passwordHash,
        role: role,
        pets: []
      };
      users.push(user);
    }

    
    await User.insertMany(users);
    res.json(users);  
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: 'Error generando usuarios', details: error.message }); 
  }
});

router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;
  
    try {
      // Generación de usuarios
      const usersArray = [];
      for (let i = 0; i < users; i++) {
        const passwordHash = await bcrypt.hash('coder123', 10);
        const role = Math.random() < 0.5 ? 'user' : 'admin';
        const user = {
          first_name: faker.person.firstName(),
          last_name: faker.person.lastName(),  
          email: faker.internet.email(),
          password: passwordHash,
          role: role,
          pets: []
        };
        usersArray.push(user);
      }
      const insertedUsers = await User.insertMany(usersArray);
  
      
      const petsArray = [];
      for (let i = 0; i < pets; i++) {
        const pet = {
          name: faker.animal.dog(),
          breed: faker.animal.type(),
          age: Math.floor(Math.random() * 15),
          adopted: false,
          specie: faker.animal.type()  
        };
        petsArray.push(pet);
      }
      const insertedPets = await Pet.insertMany(petsArray);
  
      res.json({ users: insertedUsers, pets: insertedPets });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generando datos', details: error.message }); 
    }
  });
  
  

export default router;
