import { Cancel } from "@mui/icons-material";
import { Box } from "@mui/material";
import { MessageImagePreviewProps } from "./types";
import { useEffect, useState } from "react";
import Page from "../../../../../components/Dialog";
import ImageBlur from "../../../../../components/ImageBlur";

export default function MessageImagePreview({
  image,
  removeImage,
  photoURL
}: MessageImagePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(photoURL);
  const [viewImage, setViewImage] = useState<boolean>(false);
  useEffect(() => {
    if (image) {
      setImageUrl((i) => URL.createObjectURL(new Blob([image])));
    } else {
      setImageUrl(photoURL);
    }
  }, [image, photoURL]);
  return imageUrl ? (
    <>
      <Page onClose={() => setViewImage(false)} open={viewImage}>
        <ImageBlur src={imageUrl} />
      </Page>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "end",
          width: "fit-content",
          maxWidth: "150px",
          minHeight: "120px",
          "&:hover .badge": {
            visibility: "visible",
          },
          cursor: photoURL ? "pointer" : "default"
        }}
        onClick={() => setViewImage(true)}
      >
        {!photoURL && <Box
          sx={{
            position: "absolute",
            width: "20px",
            height: "20px",
            right: 2,
            top: 2,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "red",
            visibility: "hidden",
          }}
          className="badge"
          onClick={removeImage}
        >
          <Cancel />
        </Box>}
        <img
          src={imageUrl}
          alt="Image Preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
    </>
  ) : null;
}
