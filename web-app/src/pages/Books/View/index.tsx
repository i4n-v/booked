import { useParams } from "react-router-dom"
import Content from "../../../components/Layout/Content/styles"
import { Box, Button, Rating, Typography } from "@mui/material"
import { useQuery } from "react-query"
import useBook from "../../../services/useBook"
import { BookDescription, BookDetailsContainer, BookImage, BookImageContainer, BookInfoContainer, BookRating, BookRatingContainer, CategoryBadge } from "./styles"
import { toBRL } from "../../../utils"
import BookBackground from "../../../assets/SVG/book-background.svg"

export default function BooksView() {
    const { bookId } = useParams()
    const { getBook } = useBook()

    const { data: book } = useQuery(['getBook', [bookId]], () => getBook(bookId as string))
    return (
        <Content headerHeight="fit-content" sx={{ paddingTop: 0, paddingBottom: 0 }} >
            <BookInfoContainer>
                <Box >
                    <BookImageContainer  >
                        <BookImage src={(book?.photo_url || BookBackground)} alt="book cover" />
                    </BookImageContainer>
                    <Box display={"flex"} rowGap={"12px"} flexDirection={"column"}>
                        <Button fullWidth variant="contained">
                            {
                                parseFloat(`${book?.price}`) > 0 
                                ?`COMPRAR POR ${toBRL(parseFloat(`${book?.price}`))}`
                                : "GRATUITO"
                            }
                        </Button>
                        <Button fullWidth variant="outlined">LER AMOSTRA GRATUITA</Button>
                    </Box>
                </Box>
                <BookDetailsContainer>
                    <h1>{book?.name}</h1>
                    <h2>{book?.user?.name}</h2>
                    <Box display={"flex"} flexWrap={"wrap"} gap={"8px"}>
                        {book?.categories.map((c) => <CategoryBadge>{c.name}</CategoryBadge>)}
                    </Box>

                    <BookRatingContainer>
                        <BookRating
                            value={1}
                            readOnly
                            precision={0.5}
                        />
                        <Typography component="span" sx={{font: t => t.font.sm,color: t => t.palette.secondary[700]}}>( 1 )</Typography>
                    </BookRatingContainer>
                    <BookDescription>
                        <Typography component={"span"}>
                            Sobre o Livro
                        </Typography>
                        <Typography>
                            {book?.description}
                        </Typography>
                    </BookDescription>
                </BookDetailsContainer>
            </BookInfoContainer>
            <Box></Box>
        </Content>
    )
}