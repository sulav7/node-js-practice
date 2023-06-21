import "dotenv/config";
import { appConfig } from "./config/appConfig";
import app from "./config/express";
import sequelize from "./setup/databaseSetup";

(async function () {
  try {
    await sequelize.authenticate().then(async () => {
      console.log("Database connected successfully");
      await sequelize.sync({ alter: true });
    });

    app.listen(appConfig.port, () => {
      console.log(`app is running at ${appConfig.port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();
