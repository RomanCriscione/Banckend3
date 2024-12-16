import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll().populate('owner pet');
    if (!result || result.length === 0) {
      return res.status(404).send({ status: "error", error: "No adoptions found" });
    }
    res.send({ status: "success", payload: result });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({ _id: adoptionId }).populate('owner pet');
    if (!adoption) {
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    }
    res.send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;
    const user = await usersService.getUserById(uid);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }

    const pet = await petsService.getBy({ _id: pid });
    if (!pet) {
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }

    if (pet.adopted) {
      return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    }

    pet.adopted = true;
    pet.owner = user._id;

    await petsService.update(pet._id, pet);
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });

    const adoption = await adoptionsService.create({
      owner: user._id,
      pet: pet._id,
    });

    res.status(201).send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message });
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
};
