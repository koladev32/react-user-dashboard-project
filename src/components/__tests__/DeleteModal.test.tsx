import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "../../utils/test-utils";
import { getUserResponse } from "../../utils/tests.data";
import DeleteModal from "../DeleteModal";

describe("renders Delete Modal", () => {
  let modal: unknown;
  beforeAll(() => {
    const wrapper = render(<DeleteModal user={getUserResponse} open={true} />);
    modal = wrapper.getByTestId("delete-user-modal");
  });

  it("renders Delete Modal", () => {
    /**
     * Testing for input and button elements
     */
    const inputElement = screen.getByTestId("delete-user-modal-input");
    expect(inputElement).toBeInTheDocument();

    const cancelButton = screen.getByTestId("user-cancel-button");
    const deleteButton = screen.getByTestId("user-delete-button");
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    /**
     * Testing if the button is disabled by default
     */
    expect(deleteButton).toBeDisabled();

    /**
     * Testing if the button is enabled when the input is not empty
     */
    userEvent.type(inputElement, `${getUserResponse.id}`);

    expect(deleteButton).not.toBeDisabled();

    /**
     * Testing if the button is disabled if the input is different from the user id
     */
    userEvent.type(inputElement, `${getUserResponse.id + 1}`);
    expect(deleteButton).toBeDisabled();

    // Cleaning the input
    userEvent.clear(inputElement);

    /**
     * Testing if the button is enabled when the input is not empty
     */
    userEvent.type(inputElement, `${getUserResponse.id}`);

    expect(deleteButton).not.toBeDisabled();

    /**
     * Submitting form
     */
    userEvent.click(deleteButton);
  });
});
