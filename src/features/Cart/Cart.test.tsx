import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders, MOCKED_STATE } from "utils/test";
import { Cart } from "./Cart";

describe("Cart", () => {
  it("renders Cart component with empty state", () => {
    renderWithProviders(<Cart />);

    expect(
      screen.getByText(/You've got no items yet. You can start shoping/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/here/i)).toBeInTheDocument();
  });

  it("renders Cart component with products", () => {
    renderWithProviders(<Cart />, {
      preloadedState: MOCKED_STATE,
    });

    const tableHeaderCells = screen.getAllByTestId("thead");
    const titles = tableHeaderCells.map(
      (item: HTMLElement) => item.textContent
    );

    const productTitles = screen.getAllByTestId("title");

    expect(titles).toEqual(["Image", "Title", "Price", "Amount", "Remove"]);
    expect(screen.getByAltText(/Title/i)).toBeInTheDocument();
    expect(productTitles[0]).toHaveTextContent(/Title/i);
    expect(screen.getByText(/\$109.95/i)).toBeInTheDocument();

    expect(screen.getAllByTestId("productItem").length).toBe(2);

    const deleteBtn = screen.getAllByLabelText("delete")[0];
    fireEvent.click(deleteBtn);

    expect(screen.getAllByTestId("productItem").length).toBe(1);

    expect(screen.getByText(/Total/i)).toBeInTheDocument();
  });
});
