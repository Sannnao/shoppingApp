import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "app/hooks";
import { selectProductsAmount } from "components/Cart/cartSlice";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const Header = () => {
  const productsAmount = useAppSelector(selectProductsAmount);

  return (
    <AppBar position="static" component="header" sx={{ padding: "10px 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">
          <Typography variant="h4">Shopping app</Typography>
        </Link>
        <Link to="card">
          <IconButton>
            <Badge badgeContent={productsAmount} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Link>
      </Box>
    </AppBar>
  );
};
