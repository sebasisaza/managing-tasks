import express from "express";
import * as database from "./database.js";
import cors from "cors";
import "express-async-errors";
import { body } from "express-validator";
import { validateRequest } from "./validate-request.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/tasks", async (req, res) => {
  const tasks = await database.getTasks();
  res.send(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const task = await database.getTask(id);
  res.send(task);
});

app.post(
  "/tasks",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("title")
      .isLength({ max: 20 })
      .withMessage("Title must be less than 20 characters"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  validateRequest,
  async (req, res) => {
    const { title, status } = req.body;
    await database.createTask(title, status);
    res.json(req.body);
  }
);

app.put(
  "/task",
  [
    body("id").notEmpty().withMessage("Id is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  validateRequest,
  async (req, res) => {
    const { id, title, status } = req.body;
    await database.updateTask(id, title, status);
    res.json(req.body);
  }
);

app.put(
  "/task/status",
  [
    body("id").notEmpty().withMessage("Id is required"),
    body("status").notEmpty().withMessage("Status is required"),
  ],
  validateRequest,
  async (req, res) => {
    const { id, status } = req.body;
    await database.updateStatusTask(id, status);
    res.json(req.body);
  }
);

app.put(
  "/task/title",
  [
    body("id").notEmpty().withMessage("Id is required"),
    body("title").notEmpty().withMessage("Title is required"),
  ],
  validateRequest,
  async (req, res) => {
    const { id, title } = req.body;
    await database.updateTitleTask(id, title);
    res.sendStatus(201).send(id);
  }
);

app.delete("/task/:id", async (req, res) => {
  const id = req.params.id;
  database.deleteTask(id);
  res.json(id);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendStatus(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server is running in port 3000");
});
