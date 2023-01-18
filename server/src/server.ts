import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/activities", async (request, response) => {
  const activities = await prisma.activity.findMany();
  return response.json(activities);
});

app.post("/activities", async (request, response) => {
  const { description } = request.body;

  const activity = await prisma.activity.create({
    data: {
      description,
      concluded: false,
    },
  });

  return response.status(201).json(activity);
});

app.delete(`/activities/:id`, async (request, response) => {
  const { id } = request.params;
  const activity = await prisma.activity.delete({
    where: {
      id: id,
    },
  });

  return response.json(activity);
});

app.put("/activities/:id", async (request, response) => {
  const { id } = request.params;
  const { description, concluded } = request.body;

  const activity = await prisma.activity.update({
    where: { id: id },
    data: { description, concluded },
  });

  return response.json(activity);
});

app.listen(3333);
