import express from "express";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.get("/activities", async (request, response) => {
  const games = await prisma.activity.findMany();
  return response.json(games);
});

app.listen(3333);
