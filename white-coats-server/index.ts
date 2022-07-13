import express, { Router } from "express";
import { Sequelize } from "sequelize";
import apiRoutes from "./src/api-routes";
import { getClinics, getPatients } from "./src/fixtures";
import initModels, { seed } from "./src/models";
import cors from "cors";
import bodyParser from "body-parser";

const sequelize = new Sequelize("sqlite::memory:");
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.options("*", cors() as any);

app.use("/api/v1", apiRoutes);

app.get("/", (req, res) => {
  res.send("Well done!");
});

initModels(sequelize);

sequelize.sync({ force: true }).then(async () => {
  const [patients, clinics] = await Promise.all([getPatients(), getClinics()]);
  await seed({ patients, clinics });

  app.listen(6000, () => {
    console.log("The application is listening on port 6000!");
  });
});
