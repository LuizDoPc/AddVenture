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
routes.get("/users/:user_id/aventura", AdventureController.adventures);
routes.get("/aventura/:user_id", AdventureController.update);
routes.get("/aventura/:user_id", AdventureController.delete);

routes.get("/tipo-aventura", AdventureTypeController.index);
routes.post("/tipo-aventura", AdventureTypeController.store);

routes.post("/users/:user_id/subscription", SubscriptionController.store);
routes.get("/users/:user_id/subscription", SubscriptionController.index);
routes.get(
  "/aventura/:adventure_id/subscription",
  SubscriptionController.adventures
);

module.exports = routes;
