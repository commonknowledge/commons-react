import express, { RequestHandler } from "express";
import bodyparser from "body-parser";
import request from "supertest";

export const wrapEndpointInApp = (url: string, endpoint: RequestHandler) => {
  const app = express();
  app.use(bodyparser.json());
  app.use(url, endpoint);

  return app;
};

export const requestEndpoint = (
  endpoint: RequestHandler,
  method: "get" | "put" | "post" | "patch" | "delete",
  url: string
) => {
  const app = wrapEndpointInApp(url, endpoint);
  return request(app)[method](url);
};
