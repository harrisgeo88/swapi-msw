import axios from "axios";
import { StatusCodes } from "http-status-codes";

import { Server } from "@/app/server";

describe("Health", () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    await server.start();
    // nock.disableNetConnect();
    // nock.enableNetConnect("127.0.0.1");
  });

  afterEach(() => {
    // nock.cleanAll();
  });

  afterAll(async () => {
    await server.stop();
    // nock.enableNetConnect();
  });

  it("/GET api/health", async () => {
    const port = (server.getHttpServer().address() as { port: number }).port;
    const response = await axios.get(`http://localhost:${port}/api/health`);
    expect(response.status).toBe(StatusCodes.OK);
  });
});
