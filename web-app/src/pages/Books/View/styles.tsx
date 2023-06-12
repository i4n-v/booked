import { Box, Rating, styled } from "@mui/material";

export const BookInfoContainer = styled(Box)(({ theme }) => ({
    maxHeight: "436px",
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    "& > div:first-of-type ": {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        "& > div > button": {
            height: "42px"
        }
    }
}))

export const BookImageContainer = styled(Box)(({ theme }) => ({
    width: '320px',
    height: '320px',
}))

export const BookImage = styled('img')(({ theme, src }) => ({
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: src ? "contain" : "none",
    objectPosition: "center center",
    display: src ? 'initial' : 'none'

}));

export const BookDetailsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    paddingTop: "40px",
    paddingLeft: "20px",
    maxWidth: "700px",
    "& > h1": {
        font: theme.font.md,
        textTransform: "capitalize",
        margin: 0
    },
    "& > h2": {
        font: theme.font.xs,
        textTransform: "capitalize",
        color: theme.palette.secondary[800],
        margin: 0,
        marginTop: 8,
        marginBottom: 12
    }
}))

export const CategoryBadge = styled('span')(({ theme }) => ({
    height: '30px',
    width: 'fit-content',
    padding: '6px 12px',
    userSelect: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary[700],
    borderRadius: '4px',
    color: theme.palette.secondary.light,
    font: theme.font.xs,
}));

export const BookRatingContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    columnGap: "5px",
    marginTop: "30px",
    paddingBottom: "6px"
}))
export const BookRating = styled(Rating)(({ theme }) => ({
    "& .MuiRating-iconFilled": {
        color: theme.palette.primary[700],
        fontSize: "32px",
    },
    "& .MuiRating-iconHover": {
        color: theme.palette.primary[700],
        fontSize: "32px",
    },
    "& .MuiRating-iconEmpty": {
        color: theme.palette.primary[700],
        fontSize: "32px",
    },
}))

export const BookDescription = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    rowGap: '8px',
    "& > span": {
        font: theme.font.md,
        fontWeight: 400
    },
    "& > p": {
        font: theme.font.sm,
        fontWeight: 400,
        color: theme.palette.secondary[800],
        textAlign: 'justify',
    },
}))