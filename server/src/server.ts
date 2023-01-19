import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/tasks", async (request, response) => {
  const tasks = await prisma.task.findMany();
  return response.json(tasks);
});

app.post("/tasks", async (request, response) => {
  const { description } = request.body;

  const task = await prisma.task.create({
    data: {
      description,
      isDone: false,
    },
  });

  return response.status(201).json(task);
});

app.delete(`/tasks/:id`, async (request, response) => {
  const { id } = request.params;
  const task = await prisma.task.delete({
    where: {
      id: id,
    },
  });

  return response.json(task);
});

app.put("/tasks/:id", async (request, response) => {
  const { id } = request.params;
  const { description, isDone } = request.body;

  const task = await prisma.task.update({
    where: { id: id },
    data: { description, isDone },
  });

  return response.json(task);
});

app.listen(3333);
