const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findIndex = repositories.findIndex((repo) => repo.id === id);
  if (findIndex < 0) {
    return response.status(400).json({ error: "repositories not found!" });
  }
  const repositorie = repositories[findIndex];
  repositorie.title = title;
  repositorie.url = url;
  repositorie.techs = techs;
  repositories[findIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex((repo) => repo.id === id);
  if (findIndex < 0) {
    return response.status(400).json({ error: "repositories not found!" });
  }
  repositories.splice(findIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findIndex = repositories.findIndex((repo) => repo.id === id);
  if (findIndex < 0) {
    return response.status(400).json({ error: "repositories not found!" });
  }
  repositories.map((repo) => {
    if (repo.id === id) {
      repo.likes += 1;
      return repo;
    }
  });
  const repositorie = repositories.find((repo) => repo.id === id);
  return response.json(repositorie);
});

module.exports = app;
