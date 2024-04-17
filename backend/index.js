import express from "express";
import cors from "cors";
import loteRoutes from "./routes/lotes.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", loteRoutes)

app.listen(8800);