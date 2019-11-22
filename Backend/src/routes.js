import express from "express";

import UserController from "./controllers/UserController";
import AdventureTypeController from "./controllers/AdventureTypeController";
import AdventureController from "./controllers/AdventureController";
import SubscriptionController from "./controllers/SubscriptionController";

const routes = express.Router();

routes.get("/users", UserController.index);
routes.post("/users", UserController.store);

routes.get("/aventura", AdventureController.index);
routes.post("/users/:user_id/aventura", AdventureController.store);

routes.get("/tipo-aventura", AdventureTypeController.index);
routes.post("/tipo-aventura", AdventureTypeController.store);

routes.post("/users/:user_id/subscription", SubscriptionController.store);

module.exports = routes;
