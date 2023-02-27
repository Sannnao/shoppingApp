import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Rating,
} from "@mui/material";
import { TrunkText } from "components/TruncText";
import { CartActions } from "components/CartActions";
import { formatAsPrice } from "utils";
import { Description } from "./Description";

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
};

type ProductItemProps = { product: Product };

export const ProductItem = ({ product }: ProductItemProps) => {
  const {
    title,
    category,
    description,
    image,
    price,
    rating: { rate, count },
  } = product;

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        src={image}
        alt={title}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <TrunkText lines={1} gutterBottom variant="h5">
          {title}
        </TrunkText>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            gutterBottom
            variant="h6"
            component={"h6"}
            color="text.secondary"
          >
            {category}
          </Typography>
          <Rating value={rate} />
        </Box>
        <Description description={description} />
      </CardContent>
      <CardContent sx={{ padding: "0 20px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component={"h5"} color="text.secondary">
            {formatAsPrice(price)}
          </Typography>

          <Typography variant="h5" component={"h5"} color="text.secondary">
            Amount: {count}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{ justifyContent: "space-between", marginBottom: "20px" }}
      >
        <CartActions product={product} />
      </CardActions>
    </Card>
  );
};
