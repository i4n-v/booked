import Lottie from "react-lottie";
import bookLoading from "../../assets/animations/book-loading.json";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: bookLoading,
        }}
        height={350}
        width={350}
      />
    </Box>
  );
}
