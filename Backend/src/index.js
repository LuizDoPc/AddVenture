import express from "express";

const app = express();

app.listen(3000, () => console.log("Listening..."));

app.get("/teste", (req, res) => {
  res.send("Funcionando :)");
});
