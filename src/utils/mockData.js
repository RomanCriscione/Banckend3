import { faker } from '@faker-js/faker';


export const generateMockUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: 'coder123',
      role: Math.random() < 0.5 ? 'user' : 'admin',
      pets: []
    });
  }
  return users;
};


export const generateMockPets = (count) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      name: faker.animal.dog(),
      breed: faker.animal.type(),
      age: Math.floor(Math.random() * 15),
      adopted: false,
      specie: faker.animal.type()
    });
  }
  return pets;
};
