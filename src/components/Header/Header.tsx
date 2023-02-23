import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const Header = () => {
  return (
    <AppBar position="static" component="header" sx={{ padding: "10px 30px" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton>
          <Badge badgeContent={4} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>
    </AppBar>
  );
};
