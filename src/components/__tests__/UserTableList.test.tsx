import React from "react";
import { render, screen } from "../../utils/test-utils";
import UserTableList from "../UserTableList";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("renders User Table", () => {
  beforeAll(() => {
    render(<UserTableList />);
  });

  it("renders User Table", () => {
    const balanceElement = screen.getByText(/Loading/i);
    expect(balanceElement).toBeInTheDocument();
  });
});
