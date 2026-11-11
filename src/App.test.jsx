import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { test, expect } from "vitest";
import App from "./App";

test("adds an item to the cart and shows it in My Cart", async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.type(screen.getByLabelText(/image title/i), "Sunset");
  await user.type(
    screen.getByLabelText(/image url/i),
    "https://example.com/sunset.jpg",
  );
  await user.type(screen.getByLabelText(/price/i), "$29.99");
  await user.type(screen.getByLabelText(/description/i), "Warm tones");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText("Sunset")).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /add to cart/i }));
  await user.click(screen.getByRole("button", { name: /my cart/i }));

  expect(screen.getByRole("heading", { name: /my cart/i })).toBeInTheDocument();
  expect(screen.getByText(/sunset/i)).toBeInTheDocument();
});
