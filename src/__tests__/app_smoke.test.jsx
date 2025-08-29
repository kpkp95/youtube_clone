import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders header with Dark Mode button", async () => {
  render(<App />);
  const btn = await screen.findByText(/Dark Mode/i);
  expect(btn).toBeInTheDocument();
});

