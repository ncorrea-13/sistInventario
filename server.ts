
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { User } from "./src/entity/User";

const app = express();
const port = 3000;

app.use(express.json());

createConnection().then(async connection => {
  console.log("Connected to PostgreSQL");

  app.get("/", async (req, res) => {
    const users = await connection.manager.find(User);
    res.json(users);
  });

  app.post("/users", async (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    await connection.manager.save(user);
    res.json(user);
  });

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch(error => console.log(error));
