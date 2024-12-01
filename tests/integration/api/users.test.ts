// import msw from "msw";
import axios from "axios";
import { StatusCodes } from "http-status-codes";

describe("Users", () => {
  it("/GET api/users", async () => {
    const port = process.env.PORT;

    const response = await axios.get(`http://localhost:${port}/api/users`);
    expect(response.status).toBe(StatusCodes.OK);
  });
});
