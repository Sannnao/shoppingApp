import { useState, useRef, useLayoutEffect } from "react";
import Box from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TextField from "@mui/material/TextField";
import { TrunkText } from "components/TruncText";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  addProduct,
  removeProduct,
  selectProducts,
} from "components/Card/cardSlice";
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
  const products = useAppSelector(selectProducts);
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
            onClick={() => dispatch(removeProduct({ id: product.id }))}
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
      </CardActions>
    </Card>
  );
};
