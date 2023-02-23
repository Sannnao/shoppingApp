import { useAppSelector } from "app/hooks";
import { selectProducts } from "./cartSlice";
type CartProps = {};

export const Cart = ({}: CartProps) => {
  const products = useAppSelector(selectProducts);

  console.log(products);

  return <div>card</div>;
};
