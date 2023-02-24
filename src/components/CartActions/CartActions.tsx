import Box from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  addProduct,
  removeProduct,
  selectProducts,
} from "components/Cart/cartSlice";
import { Product } from "components/ProductItem";

type CartActionsProps = { product: Product };

export const CartActions = ({ product }: CartActionsProps) => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const foundProduct = products.find((item) => item.product.id === product.id);
  const productAmount = foundProduct ? foundProduct.amount : 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        aria-label="remove product"
        onClick={() => {
          if (productAmount > 0) {
            dispatch(removeProduct({ id: product.id }));
          }
        }}
      >
        <RemoveIcon />
      </IconButton>
      <Typography variant="h6">{productAmount}</Typography>
      <IconButton
        aria-label="add product"
        onClick={() => dispatch(addProduct(product))}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};
