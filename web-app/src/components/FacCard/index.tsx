import React, { useState } from "react";
import { Typography, Box, useTheme } from "@mui/material";
import { FaqCardProps } from "./type";
import { ArrowDown, ArrowUp } from "../../assets/SVG";

export default function FaqCard({
  question,
  answer,
  color,
  open = false,
}: FaqCardProps) {
  const theme = useTheme();
  const [showAnswer, setShowAnswer] = useState(open);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <Box
      sx={{
        backgroundColor: color,
        maxWidth: "1040px",
        width: "100%",
        padding: "28px 40px",
        cursor: "pointer",
      }}
      onClick={toggleAnswer}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            font: theme.font.md,
            color: theme.palette.secondary.A200,
            [theme.breakpoints.down("sm")]: {
              font: theme.font.sm,
            },
          }}
        >
          {question}
        </Typography>
        {showAnswer ? <ArrowUp /> : <ArrowDown />}
      </Box>
      {showAnswer && (
        <Typography
          sx={{
            font: theme.font.sm,
            color: theme.palette.secondary[800],
            marginTop: "22px",
            [theme.breakpoints.down("sm")]: {
              font: theme.font.xs,
            },
          }}
        >
          {answer}
        </Typography>
      )}
    </Box>
  );
}
