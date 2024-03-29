import { useState } from "react";
import { BookCardProps } from "./types";
import { Box, Rating, Typography, styled, useTheme } from "@mui/material";
import { toBRL } from "../../../utils";
import bookBackground from "../../../assets/SVG/book-background.svg";
import { FavoriteOutlined, Favorite } from "../../../assets/SVG";
import MoreOptions from "../../MoreOptions";
import useWishes from "../../../services/useWishe";
import { useMutation } from "react-query";
import useNotifier from "../../../helpers/Notify";

export default function BookCard({
  bookId,
  size,
  image,
  title,
  author,
  rating,
  ratingQuantity,
  price,
  actionsOptions,
  showPrice = true,
  showWishe = true,
  wished = false,
  onClick = () => null,
}: BookCardProps) {
  const theme = useTheme();
  const notify = useNotifier();
  const [isWished, setIsWished] = useState(wished);

  const { createWishe, deleteWishe } = useWishes();

  const createWisheMutation = useMutation(createWishe);
  const deleteWisheMutation = useMutation(deleteWishe);

  function togleWishe(event: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    event.stopPropagation();

    if (!isWished) {
      createWisheMutation.mutate(bookId!, {
        onSuccess(response) {
          notify(response.message);
          setIsWished(true);
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    } else {
      deleteWisheMutation.mutate(bookId!, {
        onSuccess(response) {
          notify(response.message);
          setIsWished(false);
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    }
  }

  const BookImage = styled(Box)(({ theme }) => ({
    width: "100%",
    height: size === "lg" ? "280px" : "160px",
    background: theme.palette.secondary[200],
    borderRadius: "8px 8px 0 0",
    display: "flex",
    "& > img": {
      width: "100%",
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: image ? "contain" : "none",
      objectPosition: "center center",
    },
  }));

  const BookContainer = styled(Box)(({ theme }) => ({
    width: "440px",
    minWidth: size === "lg" ? "380px" : "0px",
    maxWidth: size === "lg" ? "440px" : "278px",
    height: size === "lg" ? "437px" : "278px",
    background: theme.palette.secondary.light,
    boxShadow: theme.shadows[1],
    borderRadius: "8px",
    transition: "0.3s",
    cursor: "pointer",
    position: "relative",
    "& > div + div > h6": {
      font: theme.font[size === "lg" ? "md" : "sm"],
      color: theme.palette.secondary.A200,
      maxWidth: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    "& > p": {
      font: theme.font[size === "lg" ? "sm" : "xs"],
      color: theme.palette.secondary[800],
      marginBottom: size === "lg" ? "20px" : "18px",
      paddingLeft: size === "lg" ? "20px" : "12px",
    },
    "& > div + div": {
      display: "flex",
      gap: 4,
      justifyContent: "space-between",
      alignItems: "center",
      padding: size === "lg" ? "0 20px" : "0 12px",
      marginTop: size === "lg" ? "20px" : "12px",
      marginBottom: size === "lg" ? "12px" : "8px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  }));

  const InteractiveContainer = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: size === "lg" ? "0 20px" : "0 12px",
    "& > div": {
      display: "flex",
      alignItems: "center",
      gap: "2px",
      "& > span": {
        font: theme.font[size === "lg" ? "sm" : "xs"],
        color: theme.palette.secondary[600],
      },
    },
    "& > span": {
      padding: "6px 12px",
      font: theme.font[size === "lg" ? "md" : "xs"],
      color: theme.palette.secondary.light,
      background: theme.palette.primary[700],
      borderRadius: "4px",
    },
  }));

  const FavoriteIcon = styled(isWished ? Favorite : FavoriteOutlined)(() => ({
    width: "32px",
    height: "32px",
  }));

  const [dropdown, setDropdown] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      {actionsOptions && (
        <MoreOptions
          options={actionsOptions}
          open={dropdown}
          handleOpen={setDropdown}
          id={`card-${title}-${author}`}
        />
      )}
      <BookContainer onClick={() => onClick()}>
        <BookImage>
          <img src={image || bookBackground} alt="Capa do livro." />
        </BookImage>
        <Box>
          <Typography component="h6">{title} </Typography>
          {showWishe && <FavoriteIcon onClick={togleWishe} />}
        </Box>
        <Typography component="p">Autor: {author}</Typography>
        <InteractiveContainer>
          <Box>
            <Rating
              value={parseFloat(rating as unknown as string)}
              color={theme.palette.primary[700]}
              readOnly
              precision={0.5}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: theme.palette.primary[700],
                  fontSize: size === "lg" ? "32px" : "24px",
                },
                "& .MuiRating-iconHover": {
                  color: theme.palette.primary[700],
                  fontSize: size === "lg" ? "32px" : "24px",
                },
                "& .MuiRating-iconEmpty": {
                  color: theme.palette.primary[700],
                  fontSize: size === "lg" ? "32px" : "24px",
                },
              }}
            />
            <Typography component="span">({ratingQuantity})</Typography>
          </Box>
          {showPrice && (
            <Typography component="span">
              {parseInt(price as unknown as string)
                ? toBRL(parseInt(price as unknown as string))
                : "Gratuito"}
            </Typography>
          )}
        </InteractiveContainer>
      </BookContainer>
    </Box>
  );
}
