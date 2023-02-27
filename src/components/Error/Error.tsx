import { Alert } from "@mui/material";
import { CenterContainer } from "components/CenterContainer";

type ErrorProps = {
  message: string;
};

export const Error = ({ message }: ErrorProps) => {
  return (
    <CenterContainer>
      <Alert severity="error">{message}</Alert>
    </CenterContainer>
  );
};
