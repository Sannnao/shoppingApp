import { ProductItem } from "components/Cart";
const BASE_KEY = "storeApp";

const getParsedItemsFromLs = (): Record<number, ProductItem> | undefined => {
  const items = localStorage.getItem(BASE_KEY);

  if (items) {
    return JSON.parse(items);
  }
};

const addItemsToLs = (items: unknown) => {
  localStorage.setItem(BASE_KEY, JSON.stringify(items));
};

export const getItemsFromLs = () => {
  return getParsedItemsFromLs();
};

export const setItemToLs = (id: number, item: ProductItem) => {
  const items = getParsedItemsFromLs();

  if (items) {
    items[id] = item;

    addItemsToLs(items);
  } else {
    addItemsToLs({ [id]: item });
  }
};

export const removeItemFromLs = (id: number) => {
  const items = getParsedItemsFromLs();

  if (items) {
    delete items[id];

    addItemsToLs(items);
  }
};
