import { Link } from "react-router-dom";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { useAppSelector } from "app/hooks";
import { selectCartProducts } from "./cartSlice";
import { CartTable } from "./CartTable";

export const Cart = () => {
  const cartProducts = useAppSelector(selectCartProducts);

  return !cartProducts.length ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h6" color={"disabled"}>
        You've got no items yet. You can start shoping{" "}
        <MuiLink component={Link} to="/" color="primary" underline="none">
          here
        </MuiLink>
      </Typography>
    </Box>
  ) : (
    <CartTable />
  );
};
