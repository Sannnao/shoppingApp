import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "utils/test";
import { ProductItem } from "./ProductItem";

const MOCKED_PRODUCT = {
  id: 1,
  title: "Title",
  price: 109.95,
  description: "Description",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

describe("ProductItem", () => {
  it("renders ProductItem component", async () => {
    renderWithProviders(<ProductItem product={MOCKED_PRODUCT} />);

    expect(screen.getByText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/\$109.95/i)).toBeInTheDocument();
    expect(screen.getByText(/men's clothing/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Title/i)).toBeInTheDocument();
    expect(screen.getByText(/120/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount:/i)).toBeInTheDocument();
  });

  it("Description interactive works correclty", () => {
    renderWithProviders(<ProductItem product={MOCKED_PRODUCT} />);

    const descriptionExpanded = screen.getByTestId("expanded");
    expect(descriptionExpanded).toHaveTextContent("Description");
    expect(descriptionExpanded).toHaveStyle("opacity: 0");

    const descriptionCollapsed = screen.getByTestId("collapsed");
    expect(descriptionCollapsed).toHaveTextContent("Description");
    expect(descriptionCollapsed).toHaveStyle("opacity: 1");

    const expandButton = screen.getByTestId("expandButton");
    expect(expandButton).toHaveTextContent("Learn More");

    fireEvent.click(expandButton);

    expect(descriptionExpanded).toHaveStyle("opacity: 1");
    expect(descriptionCollapsed).toHaveStyle("opacity: 0");
    expect(expandButton).toHaveTextContent("See less");
  });
});
