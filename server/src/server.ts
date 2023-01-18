import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/activities", async (request, response) => {
  const games = await prisma.activity.findMany();
  return response.json(games);
});

app.post("/activities", async (request, response) => {
  const body = request.body;

  const activity = await prisma.activity.create({
    data: {
      title: body.title,
      description: body.description,
      concluded: body.concluded,
    },
  });

  return response.status(201).json(activity);
});

app.listen(3333);
