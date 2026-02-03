const express = require("express");
const { v4: uuidv4 } = require("uuid");
const store = require("./store");

require("./scheduler");
const logger = require("./logger");



const app = express();
app.use(express.json());

app.post("/api/endpoints", async (req, res) => {

  const endpoint = {
    id: uuidv4(),
    url: req.body.url,
    expectedStatus: req.body.expectedStatus || 200,
    lastState: "UNKNOWN"
  };

  await store.add(endpoint);

  res.status(201).json(endpoint);
});

app.get("/api/endpoints", (req, res) => {
  res.json(store.getAll());
});

app.listen(3000, () => {
  logger.info("Server started", { port: 3000 });

});
