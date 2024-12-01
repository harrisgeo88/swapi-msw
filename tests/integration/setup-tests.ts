import { Server } from "@/src/app/server";

let server: Server;

beforeAll(async () => {
  server = new Server();
  await server.start();
  const port = (server.getHttpServer().address() as { port: number }).port;

  process.env.PORT = port.toString();
});

afterAll(async () => {
  await server.stop();
});
