const BASE_KEY = "storeApp";

export const getItemFromLs = (id: number) => {
  const item = localStorage.getItem(`${BASE_KEY}.${id}`);

  if (item) {
    return JSON.parse(item);
  }
};

export const setItemToLs = <T>(id: number, item: T) => {
  localStorage.setItem(`${BASE_KEY}.${id}`, JSON.stringify(item));
};

export const removeItemFromLs = (id: number) => {
  localStorage.removeItem(`${BASE_KEY}.${id}`);
};
