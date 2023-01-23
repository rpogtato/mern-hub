import { Box } from "@mui/material";
import { styled } from "@mui/system";

//reusable css flex component
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;