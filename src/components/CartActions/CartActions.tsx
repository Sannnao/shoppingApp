import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  addProductWithLs,
  decreaceProductAmountWithLs,
  selectCartProductById,
} from "components/Cart/cartSlice";
import { Product } from "components/ProductItem";

type CartActionsProps = { product: Product };

export const CartActions = ({ product }: CartActionsProps) => {
  const dispatch = useAppDispatch();
  const id = product.id;
  const foundProduct = useAppSelector((state) =>
    selectCartProductById(state, id)
  );
  const productAmount = foundProduct ? foundProduct.amount : 0;

  const addProductToCart = () => {
    dispatch(addProductWithLs(product));
  };

  const removeProductFromCart = () => {
    dispatch(decreaceProductAmountWithLs({ id }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton aria-label="remove product" onClick={removeProductFromCart}>
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6">{productAmount}</Typography>
      <IconButton aria-label="add product" onClick={addProductToCart}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
