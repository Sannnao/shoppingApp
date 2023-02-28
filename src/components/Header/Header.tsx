import AppBar from "@mui/material/AppBar";
import { Box, Badge, IconButton, Link as MuiLink } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "app/hooks";
import { selectCartProducts } from "components/Cart/cartSlice";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const Header = () => {
  const cartProducts = useAppSelector(selectCartProducts);
  const productsAmount = cartProducts.reduce(
    (acc, product) => acc + product.amount,
    0
  );

  return (
    <AppBar position="static" component="header" sx={{ padding: "10px 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <MuiLink component={Link} to="/" underline="none" color="inherit">
          <Typography variant="h4">Shopping app</Typography>
        </MuiLink>
        <MuiLink component={Link} to="card">
          <IconButton>
            <Badge badgeContent={productsAmount} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </MuiLink>
      </Box>
    </AppBar>
  );
};
