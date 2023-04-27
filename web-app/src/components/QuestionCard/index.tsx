import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

interface FaqCardProps {
  question: string;
  answer: string;
  color?: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer, color }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <Card sx={{ marginBottom: '1px', backgroundColor: color, boxShadow: 'none' }}>
      <CardContent sx={{ pl: 4 }}>
        <Typography sx={{
          display: 'flex', alignItems: 'center', cursor: 'pointer',
          font: (t) => t.font.md
        }}>
          {question}
          <IconButton sx={{ ml: 'auto', color: (t) => t.palette.primary.main }} size="small" onClick={toggleAnswer}>
            {showAnswer ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </Typography>
        {showAnswer && (
          <Typography sx={{
            font: (t) => t.font.xs,
            color: (t) => t.palette.secondary[800],
            marginTop: '1rem'
          }}>
            {answer}
          </Typography>
        )}
      </CardContent>
    </Card>


  );
};

export default FaqCard;
