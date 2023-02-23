import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type TruncTextProps = {
  lines: number;
};

export const TrunkText = styled(Typography)<TruncTextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lines};
  line-clamp: ${(props) => props.lines};
  -webkit-box-orient: vertical;
`;
