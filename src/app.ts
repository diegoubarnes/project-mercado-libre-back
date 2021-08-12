import express from "express";
import path from "path";

import { loadApiEndpoints } from "./controllers/api";
import  cors  from "cors";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

loadApiEndpoints(app);

export default app;
