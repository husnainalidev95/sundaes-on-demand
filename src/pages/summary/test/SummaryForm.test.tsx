import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryForm } from "../SummaryForm";

test("Should test checkbox functionality and interaction with button", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  const termsAndConditionCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(termsAndConditionCheckbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();

  await user.click(termsAndConditionCheckbox);
  expect(termsAndConditionCheckbox).toBeChecked();
  expect(confirmOrderButton).toBeEnabled();

  await user.click(termsAndConditionCheckbox);
  expect(termsAndConditionCheckbox).not.toBeChecked();
  expect(confirmOrderButton).toBeDisabled();
});

test("Popover respond to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts hidden
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );

  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndCondition = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndCondition);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndCondition);
  expect(popover).not.toBeInTheDocument();
});
