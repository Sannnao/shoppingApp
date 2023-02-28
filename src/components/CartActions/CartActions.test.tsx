import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders, MOCKED_STATE, MOCKED_PRODUCT } from "utils/test";
import { CartActions } from "./CartActions";

describe("CartActions", () => {
  it("renders CartActions component", () => {
    renderWithProviders(<CartActions product={MOCKED_PRODUCT} />, {
      preloadedState: MOCKED_STATE,
    });
    const addProductBtn = screen.getByLabelText("add product");
    const removeProductBtn = screen.getByLabelText("remove product");
    const productAmount = screen.getByTestId("productAmount");

    expect(productAmount).toHaveTextContent("3");

    fireEvent.click(addProductBtn);
    expect(productAmount).toHaveTextContent("4");

    fireEvent.click(removeProductBtn);
    fireEvent.click(removeProductBtn);
    expect(productAmount).toHaveTextContent("2");
  });
});
