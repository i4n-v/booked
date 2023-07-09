import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Blurhash } from "react-blurhash";

export default function ImageBlur({
  src,
  hash,
  otherwise,
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & { hash?: string; otherwise?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const loadImage = async (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (...args) => reject(args);
    });

  const fileUrlChange = useCallback(() => {
    (async () => {
      try {
        await loadImage(src as string).then(() => {
          setIsLoading(true);
          console.log();
        });
      } catch (error) {
        return;
      }
    })();
  }, [src]);
  useEffect(() => {
    fileUrlChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <>
      {!isLoading ? (
        !hash ? (
          <img src={otherwise} alt="" {...props} />
        ) : (
          <Box width={"100%"} height={"100%"} position={"absolute"}>
            <Blurhash
              hash={hash}
              width={"100%"}
              height={"100%"}
              resolutionX={32}
              resolutionY={32}
              punch={1}
            />
          </Box>
        )
      ) : (
        <img src={src} alt="" {...props} />
      )}
    </>
  );
}
