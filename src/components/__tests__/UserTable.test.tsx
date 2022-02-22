import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "../../utils/test-utils";
import UserTable from "../UserTable";
import { getUserListResponse } from "../../utils/tests.data";

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  rest.get("/users/", (req, res, ctx) => {
    return res(ctx.json(getUserListResponse), ctx.delay(150));
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("renders User Table", () => {
  beforeAll(() => {
    render(<UserTable />);
  });

  it("renders User Table", () => {
    const balanceElement = screen.getByText(/Name/i);
    expect(balanceElement).toBeInTheDocument();
  });
});
