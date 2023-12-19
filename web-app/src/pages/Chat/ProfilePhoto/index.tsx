import { Box } from "@mui/material";
import { ProfilePhotoProps } from "./tyes";

export default function ProfilePhoto({ src, size }: ProfilePhotoProps) {
  return (
    <Box
      component="div"
      sx={{
        borderRadius: "50%",
        width: size ? size : "100%",
        height: size ? size : "100%",
        minWidth: "0",
        padding: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: (t) => t.palette.primary.main,
        "& img": {
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          objectFit: "cover",
        },
        "& svg": {
          width: "100%",
          height: "100%",
          borderRadius: "50%",
        },
      }}
    >
      <img src={src} alt="Selected Preview" />
    </Box>
  );
}
