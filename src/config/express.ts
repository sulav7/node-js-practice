import express from "express";
import cors from "cors";
import router from "./routerConfig";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/api/v1", router);
export default app;
