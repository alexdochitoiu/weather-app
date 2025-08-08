import express from "express";
import {
  addCity,
  updateCity,
  deleteCity,
  searchCitiesByName,
} from "@/services/cities.service";
import { CityError } from "@/types/errors";
import { getErrorMessage } from "@/utils/error";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const id = await addCity(req.body);
    res.status(201).json({ id });
  } catch (e) {
    res.status(500).json({ error: getErrorMessage(e) });
  }
});

router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await updateCity(id, req.body);
    res.json({ updated: true });
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    if (errorMessage === CityError.NotFound) {
      res.status(404).json({ error: CityError.NotFound });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await deleteCity(id);
    res.json({ deleted: true });
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    if (errorMessage === CityError.NotFound) {
      res.status(404).json({ error: CityError.NotFound });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

router.get("/search", async (req, res) => {
  try {
    if (!req.query.name || typeof req.query.name !== "string") {
      return res.status(400).json({ error: "Query param 'name' is required" });
    }
    const cities = await searchCitiesByName(req.query.name);
    res.json(cities);
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    if (errorMessage === CityError.NotFound) {
      res.status(404).json({ error: CityError.NotFound });
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

export default router;
