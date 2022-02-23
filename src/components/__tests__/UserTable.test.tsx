import React from "react";
import { render } from "../../utils/test-utils";
import UserTable from "../table/UserTable";
import { getUserListResponse } from "../../utils/tests.data";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("renders Custom Tables", () => {
  let table: unknown;
  let rowsNumber = 0;

  const tableHeaders = [
    "Id",
    "Name",
    "Username",
    "City",
    "Email",
    "Edit",
    "Delete",
  ];

  beforeAll(() => {
    const wrapper = render(<UserTable users={getUserListResponse} />);
    table = wrapper.getByTestId("user-table");
  });

  it("renders Table", () => {
    /**
     * Testing table headers
     */
    expect(table).toBeInTheDocument();
    tableHeaders.forEach((header) => {
      expect(table).toHaveTextContent(header);
    });

    /**
     * Testing table rows and incrementing rows number
     */

    getUserListResponse.forEach((user) => {
      const row = table.querySelector(`[data-testid="user-row-${user.id}"]`);
      expect(row).toBeInTheDocument();
      rowsNumber++;
    });

    /**
     * Testing if the rows in the table are the same as the number of users in the response
     */

    expect(rowsNumber).toBe(getUserListResponse.length);
  });
});
