import { Typography } from "@mui/material";

export default function highlightText(text, result = [], matchNumber = 0) {
  if (!text) return;
  const match = text.match(/.*(\*.*\*).*/);
  if (!!match) {
    const split = text.split(match[1]);
    const newText = split[0] + "match" + matchNumber + " " + split[1];
    const highlighted = (
      <Typography key={match[1]} variant="span" fontWeight={700}>
        {`${match[1].replaceAll("*", "")} `}
      </Typography>
    );

    result.push(highlighted);
    return highlightText(newText, result, matchNumber + 1);
  }

  const final = text.split(" ").map((piece) => {
    return result.find((_, index) => piece === "match" + index) || ` ${piece} `;
  });

  return final;
}
