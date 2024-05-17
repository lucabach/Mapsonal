import express from "express";
import bodyParser from "body-parser";
import ViteExpress from "vite-express";
import findRoute from "./routing";
import { Coords, MeansOfTransport } from "./model/Types";

// creates the expres app do not change
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post("/api/route/", (req, res) => {
  if (
    req.body === undefined ||
    req.body.from === undefined ||
    req.body.to === undefined ||
    req.body.datetime === undefined ||
    req.body.meansOfTransport === undefined
  ) {
    res.status(400).json({
      message: `Incorrect routing request. Please specify departure and arrival, as well as departure time and means of transport.`,
    });
  }

  const body = req.body as {
    from: string;
    to: string;
    suggestedOriginLoc: Coords | undefined;
    suggestedDestinationLoc: Coords | undefined;
    datetime: string;
    meansOfTransport: MeansOfTransport;
  };
  const date = new Date(body.datetime);

  findRoute(body.from, body.to, date, body.meansOfTransport)
    .then((routeInfo) => {
      console.log(routeInfo);
      res.status(200).json(routeInfo);
    })
    .catch((error: Error) => res.status(500).json({ message: error.message }));
});

// Do not change below this line
ViteExpress.listen(app, 5173, () =>
  console.log("Server is listening on http://localhost:5173"),
);
