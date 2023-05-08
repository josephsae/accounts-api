import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const server = express();
  server.use(cors());
  server.use(express.json());
  return server;
}

export function createRouter() {
  const router = express.Router();
  return router;
}

