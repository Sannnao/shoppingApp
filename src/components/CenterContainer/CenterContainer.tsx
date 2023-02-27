import Box from "@mui/material/Box";

type CenterContainerProps = {
  children: React.ReactNode;
};

export const CenterContainer = ({ children }: CenterContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </Box>
  );
};
