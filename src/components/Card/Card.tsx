import { useAppSelector } from "app/hooks";
import { selectProducts } from "./cardSlice";
type CardProps = {};

export const Card = ({}: CardProps) => {
  const products = useAppSelector(selectProducts);

  console.log(products);

  return <div>card</div>;
};
