import express from "express";

import routes from "./routes";

import authMiddleware from "./middlewares/auth";

import "./database";

import AuthController from "./controllers/AuthController";
import UserController from "./controllers/UserController";

const app = express();

app.use(express.json());

app.post("/users", UserController.store);
app.use("/login", AuthController.login);

app.use("/", authMiddleware);

app.use(routes);

app.listen(4444, () => console.log("Listening..."));
