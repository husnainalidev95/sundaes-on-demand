import { fireEvent, render, screen } from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

test("Should test checkbox functionality and interaction with button", () => {
  render(<SummaryForm />);

  const termsAndConditionCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(termsAndConditionCheckbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();

  fireEvent.click(termsAndConditionCheckbox);
  expect(termsAndConditionCheckbox).toBeChecked();
  expect(confirmOrderButton).toBeEnabled();

  fireEvent.click(termsAndConditionCheckbox);
  expect(termsAndConditionCheckbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();
});
