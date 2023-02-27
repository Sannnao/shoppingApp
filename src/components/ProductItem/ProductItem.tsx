import { useState, useRef, useLayoutEffect } from "react";
import {
  Box,
  Card,
  Collapse,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Rating,
} from "@mui/material";
import { TrunkText } from "components/TruncText";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CartActions } from "components/CartActions";
import { selectCartProducts } from "components/Cart/cartSlice";
import { formatAsPrice } from "utils";

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
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectCartProducts);
  const foundProduct = products.find((item) => item.product.id === product.id);
  const productAmount = foundProduct ? foundProduct.amount : 0;
  const descriptionTrunkRef = useRef<HTMLSpanElement | null>(null);
  const [descriptionHeight, setDescriptionHeight] = useState<null | number>(
    null
  );
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    if (descriptionTrunkRef?.current) {
      setDescriptionHeight(descriptionTrunkRef.current.clientHeight);
    }
  }, [descriptionTrunkRef]);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

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
        <Box sx={{ minHeight: "60px" }}>
          <Collapse
            orientation="vertical"
            collapsedSize={descriptionHeight!}
            in={expanded}
            timeout="auto"
            sx={{ position: "relative" }}
          >
            <Typography
              gutterBottom
              variant="body2"
              color="text.secondary"
              sx={{
                ...(!expanded ? { transition: "opacity 500ms" } : {}),
                opacity: expanded ? 1 : 0,
              }}
            >
              {description}
            </Typography>
            <TrunkText
              ref={descriptionTrunkRef}
              gutterBottom
              lines={3}
              variant="body2"
              color="text.secondary"
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                ...(!expanded ? { transition: "opacity 500ms" } : {}),
                opacity: expanded ? 0 : 1,
              }}
            >
              {description}
            </TrunkText>
          </Collapse>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            onClick={toggleExpanded}
            sx={{
              visibility:
                descriptionHeight && descriptionHeight < 60
                  ? "hidden"
                  : "initial",
            }}
          >
            {expanded ? "See less" : "Learn More"}
          </Button>
        </Box>
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
