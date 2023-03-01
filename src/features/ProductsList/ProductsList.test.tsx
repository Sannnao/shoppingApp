import { rest } from "msw";
import { setupServer } from "msw/node";
import { screen } from "@testing-library/react";
import { setupStore } from "app/store";
import { renderWithProviders, MOCKED_PRODUCTS_LIST } from "utils/test";
import { apiSlice } from "features/api/apiSlice";
import { ProductsList } from "./ProductsList";

export const handlers = [
  rest.get("https://fakestoreapi.com/products", (_req, res, ctx) => {
    return res(ctx.json(MOCKED_PRODUCTS_LIST), ctx.delay(150));
  }),
];

const store = setupStore();
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(apiSlice.util.resetApiState());
});
afterAll(() => server.close());

describe("ProductsList", () => {
  test("Fetches & receives products", async () => {
    renderWithProviders(<ProductsList />);

    const productsListAwait = await screen.findAllByTestId("productListItem");
    expect(productsListAwait.length).toBe(2);
  });

  test("Show error while fetching products fails", async () => {
    server.use(
      rest.get("https://fakestoreapi.com/products", (_req, res, ctx) => {
        return res.networkError("Error");
      })
    );

    renderWithProviders(<ProductsList />);

    expect(
      await screen.findByText(/Something happend while loading Products/i)
    ).toBeInTheDocument();
  });

  test("Show loading state while fetching products", async () => {
    server.use(
      rest.get("https://fakestoreapi.com/products", (_req, res, ctx) => {
        return res.once(ctx.status(200), ctx.delay("infinite"));
      })
    );

    renderWithProviders(<ProductsList />);

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});
