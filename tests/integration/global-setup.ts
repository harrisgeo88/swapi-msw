import { Server } from "@/src/app/server";

export {};

let server: Server;

export async function setup() {
  server = new Server();
  await server.start();
  const port = (server.getHttpServer().address() as { port: number }).port;

  process.env.PORT = port.toString();
}

export async function teardown() {
  await server.stop();
}

process.env = {
  PORT: "3000",
};
