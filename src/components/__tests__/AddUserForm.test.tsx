import React from "react";
import { render, screen, act } from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import AddUserForm from "../forms/AddUserForm";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("renders Add User Form", () => {
  let form: unknown;
  beforeAll(() => {
    form = render(<AddUserForm />);
  });

  it("renders User Form", async () => {
    const nameInput = screen.getByTestId("name-input").querySelector("input");
    expect(nameInput).toBeInTheDocument();
    const emailInput = screen.getByTestId("email-input").querySelector("input");
    expect(emailInput).toBeInTheDocument();

    /**
     * Button must be not be disabled by default
     */
    const submitButton = screen.getByTestId("add-user-button");
    expect(submitButton).not.toBeDisabled();

    userEvent.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");

    /**
     * Testing if the button is enabled when the email input is not empty
     */

    await userEvent.type(emailInput, "test@yopmail.com");
    expect(emailInput).toHaveValue("test@yopmail.com");
    expect(submitButton).not.toBeDisabled();

    /**
     * Submitting form
     */

    await act(async () => {
      await userEvent.click(submitButton);
    });
  });
});
