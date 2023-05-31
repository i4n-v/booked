import React from "react";
import { BookCardProps } from "./types";
import { Box, IconButton, Rating, Typography, styled, useTheme } from "@mui/material";
import { toBRL } from "../../../utils";
import bookBackground from "../../../assets/SVG/book-background.svg";
import { MoreVert } from "@mui/icons-material";

export default function BookCard({
  size,
  image,
  title,
  author,
  rating,
  ratingQuantity,
  price,
}: BookCardProps) {
  const theme = useTheme();

  const BookImage = styled(Box)(({ theme }) => ({
    width: "100%",
    height: size === "lg" ? "280px" : "160px",
    background: theme.palette.secondary[200],
    borderRadius: "8px 8px 0 0",
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
    "& > h6": {
      font: theme.font[size === "lg" ? "md" : "sm"],
      color: theme.palette.secondary.A200,
      marginTop: size === "lg" ? "20px" : "12px",
      marginBottom: size === "lg" ? "12px" : "8px",
      paddingLeft: size === "lg" ? "20px" : "12px",
    },
    "& > p": {
      font: theme.font[size === "lg" ? "sm" : "xs"],
      color: theme.palette.secondary[800],
      marginBottom: size === "lg" ? "20px" : "18px",
      paddingLeft: size === "lg" ? "20px" : "12px",
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

  return (
    <BookContainer>
      <Box sx={{ position: 'absolute', right: 0 }}>
        <IconButton color="primary">
          <MoreVert />
        </IconButton>
      </Box>
      <BookImage>
        <img src={image || bookBackground} alt="Capa do livro." />
      </BookImage>
      <Typography component="h6">{title}</Typography>
      <Typography component="p">Autor: {author}</Typography>
      <InteractiveContainer>
        <Box>
          <Rating
            value={rating}
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
        <Typography component="span">
          {parseInt(price as unknown as string) ? toBRL(parseInt(price as unknown as string)) : "Gratuito"}
        </Typography>
      </InteractiveContainer>
    </BookContainer>
  );
}
