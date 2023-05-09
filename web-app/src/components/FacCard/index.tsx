import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { FaqCardProps } from './type';
import { Box, styled } from "@mui/material";

const FaqList = styled(Box)(({ theme }) => ({

  "& > .MuiCard-root": {
    maxWidth: "1040px",
    width: "100%",
    boxShadow: 'none',
    borderRadius: '10px',
    paddingLeft: ' 40px',
    margin: 0,
  },

  ".faq-title": {
    maxWidth: "1030px",
    font: theme.font.md,
    color: theme.palette.secondary.A200,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '16px 0',

  },
  ".faq-question": {
    maxWidth: "90%",
    font: theme.font.xs,
    color: theme.palette.secondary[800],
    padding: '10px 0px',
  },

  [theme.breakpoints.down("md")]: {
    ".faq-title": {
      font: theme.font.sm,
      maxWidth: "70%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    ".faq-title": {
      font: theme.font.xs,
      maxWidth: "80%",
    },
  },
}));

const FaqCard: React.FC<FaqCardProps> = ({ question, answer, color }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <FaqList>
      <Card sx={{ backgroundColor: color }}>
        <CardContent>
          <Typography variant="h2" className='faq-title'>
            {question}
            <IconButton sx={{ ml: 'auto', color: (t) => t.palette.primary.main }} size="small" onClick={toggleAnswer}>
              {showAnswer ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Typography>
          {showAnswer && (
            <Typography variant="body1" className='faq-question'>
              {answer}
            </Typography>
          )}
        </CardContent>
      </Card>
    </FaqList>


  );
};

export default FaqCard;
