import { useState, useRef, useLayoutEffect } from "react";
import { Box, Collapse, Typography, Button } from "@mui/material";
import { TrunkText } from "components/TruncText";

type DescriptionProps = {
  description: string;
};

export const Description = ({ description }: DescriptionProps) => {
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

  return (
    <>
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
    </>
  );
};
