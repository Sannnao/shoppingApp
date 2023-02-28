import { screen } from "@testing-library/react";
import { renderWithProviders, MOCKED_STATE } from "utils/test";
import { Header } from "./Header";

describe("Header", () => {
  it("renders Header component", () => {
    renderWithProviders(<Header />, {
      preloadedState: MOCKED_STATE,
    });

    expect(screen.getByText(/shopping app/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();
  });
});
