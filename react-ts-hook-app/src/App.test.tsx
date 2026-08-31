import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./api/user.api", () => ({
  getAll: vi.fn().mockResolvedValue([]),
  save: vi.fn().mockResolvedValue({ id: 1, email: "a@b.co", password: "x" }),
}));

describe("App", () => {
  it("renders the credentials list and creation form", () => {
    render(<App />);

    expect(screen.getByText(/user credentials list/i)).toBeInTheDocument();
    expect(screen.getByText(/add new user credentials/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
