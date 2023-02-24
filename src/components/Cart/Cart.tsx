import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectProducts, selectTotalPrice, removeProducts } from "./cartSlice";
import { formatAsPrice } from "utils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { CartActions } from "components/CartActions";
import { Typography } from "@mui/material";

const tableHeaderItems = ["Image", "Title", "Price", "Amount", "Remove"];

export const Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const totalPrice = useAppSelector(selectTotalPrice);

  return !products.length ? (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography variant="h6" color={"disabled"}>
        You've got no items yet. You can start shoping <Link to="/">here</Link>
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
