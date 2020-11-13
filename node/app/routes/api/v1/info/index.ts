import express from "express";

const info = express.Router();

info.get("/", (_, res) => {
  res.json({
    info: {
      name: "booxperience-node",
    },
  });
});

export { info };
