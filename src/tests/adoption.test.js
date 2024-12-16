import request from 'supertest';
import { before, after } from 'mocha'
import app from '../app.js';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { usersService, petsService } from '../services/index.js';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
}

let userId, petId, adoptionId;

before(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  await new Promise((resolve) => mongoose.connection.once('connected', resolve));
  await mongoose.connection.db.dropDatabase();


  const user = await usersService.create({
    first_name: "Test",
    last_name: "User",
    email: "testuser@example.com",
    password: "password123",
  });


  const pet = await petsService.create({
    name: "Buddy",
    specie: "Dog",
    birthDate: new Date("2020-01-01"),
    adopted: false,
  });

  userId = user._id.toString();
  petId = pet._id.toString();
});

after(async () => {
  await mongoose.connection.close();
});

describe('Adoptions API', () => {
  it('debería obtener todas las adopciones', async () => {
    const response = await request(app).get('/adoptions');
    expect(response.status).to.equal(200);
    expect(response.body.payload).to.be.an('array');
  });

  it('debería crear una nueva adopción', async () => {
    const response = await request(app).post(`/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(201);
    expect(response.body.payload).to.have.property('_id');
    adoptionId = response.body.payload._id; 
    expect(response.body.payload.owner.toString()).to.equal(userId);
    expect(response.body.payload.pet.toString()).to.equal(petId);
  });

  it('debería obtener una adopción por ID', async () => {
    const response = await request(app).get(`/adoptions/${adoptionId}`);
    expect(response.status).to.equal(200);
    expect(response.body.payload).to.have.property('owner');
    expect(response.body.payload).to.have.property('pet');
    expect(response.body.payload.owner.toString()).to.equal(userId);
    expect(response.body.payload.pet.toString()).to.equal(petId);
  });

  it('no debería crear una adopción si la mascota ya está adoptada', async () => {
 
    const adoptedPet = await petsService.getBy({ _id: petId });
    adoptedPet.adopted = true;
    await petsService.update(adoptedPet._id, adoptedPet);

    const response = await request(app).post(`/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Pet is already adopted");
  });

  it('debería devolver un error si el usuario o la mascota no existen', async () => {
    const response = await request(app).post(`/adoptions/invalidUserId/invalidPetId`);
    expect(response.status).to.equal(404);
    expect(response.body.error).to.equal("User not found");
  });
});
