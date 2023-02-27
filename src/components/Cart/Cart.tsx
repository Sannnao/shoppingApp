import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { formatAsPrice } from "utils";
import { CartActions } from "components/CartActions";
import {
  selectCartProducts,
  selectTotalPrice,
  removeProducts,
} from "./cartSlice";

const tableHeaderItems = ["Image", "Title", "Price", "Amount", "Remove"];

export const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);
  const totalPrice = useAppSelector(selectTotalPrice);

  return !products.length ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h6" color={"disabled"}>
        You've got no items yet. You can start shoping{" "}
        <MuiLink component={Link} to="/" color="primary" underline="none">
          here
        </MuiLink>
      </Typography>
    </Box>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeaderItems.map((item, i) => {
              const isCenter = item === "Amount" || item === "Remove";
              return (
                <TableCell key={i} {...(isCenter && { align: "center" })}>
                  {item}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            const { id, image, title, price } = product.product;

            return (
              <TableRow key={id}>
                <TableCell>
                  <Avatar
                    src={image}
                    sx={{
                      "& .MuiAvatar-img": {
                        objectFit: "contain",
                      },
                    }}
                  />
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{formatAsPrice(price)}</TableCell>
                <TableCell>
                  <CartActions product={product.product} />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(removeProducts({ id }))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Total:</TableCell>
            <TableCell>{formatAsPrice(totalPrice)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
