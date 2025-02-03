const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser");
const addRespondToResponse = require("./interceptor/responseInterceptor");
const { RouteNotFoundError } = require("./utils/error");
const handleError = require("./errorHandler/errorException"); // Import the error handler
const sequelize = require("./config/db");
const routes = require("./routes/index");

const establishDatabaseConnection = async () => {
  try {
    // Sync models with the database
    sequelize
      .sync()
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((err) => {
        console.error("Error syncing database:", err);
      });
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = () => {
  // initialize the express app
  const app = express();

  // enable cors
  app.use(cors());
  app.options("*", cors());

  // set security HTTP headers
  app.use(helmet());

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));
  app.use(addRespondToResponse);

  app.use("/v1", routes);

  // attachPublicRoutes(app);

  // app.use("/", authenticateUser);

  // attachPrivateRoutes(app);
  // support parsing of application/json type post data
  app.use(bodyParser.json());

  // support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use((req, res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  // PORT on which the server will run
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App is listening on ${port}`);
  });
};

const initializeApp = async () => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
