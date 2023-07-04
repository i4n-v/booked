import { useNavigate, useParams } from "react-router-dom"
import Content from "../../../components/Layout/Content/styles"
import { Box, Button, Typography } from "@mui/material"
import { useMutation, useQuery } from "react-query"
import useBook from "../../../services/useBook"
import { BookDescription, BookDetailsContainer, BookImage, BookImageContainer, BookInfoContainer, BookRating, BookRatingContainer, CategoryBadge } from "./styles"
import { toBRL } from "../../../utils"
import BookBackground from "../../../assets/SVG/book-background.svg"
import Comments from "./Comments"
import useAssessment from "../../../services/useAssessment"
import useNotifier from "../../../helpers/Notify"

export default function BooksView() {
    const { bookId } = useParams()
    const { getBook } = useBook()
    const { postAssessment, putAssessment } = useAssessment()
    const navigate = useNavigate()
    const notify = useNotifier()



    const { data: book, refetch } = useQuery(['getBook', [bookId]], () => getBook(bookId as string))
    const postMutation = useMutation(postAssessment)
    const putMutation = useMutation(putAssessment)

    const sendAssessment = (value: number) => {
        if (book?.user_raters?.length) {
            putMutation.mutate({ number: value, id: book?.user_raters?.[0].assessment.id as string }, {
                onSuccess: (data) => {
                    notify(data.message)
                    refetch()
                },
                onError: (error: any) => {
                    notify(error.message, 'error')
                }
            })
            return
        }
        postMutation.mutate({ number: value, book_id: book?.id as string }, {
            onSuccess: (data) => {
                notify(data.message)
                refetch()
            },
            onError: (error: any) => {
                notify(error.message, 'error')
            }
        })
    }
    return (
        <Content headerheight="fit-content" sx={{ paddingTop: 0, paddingBottom: 5 }} >
            <BookInfoContainer>
                <Box >
                    <BookImageContainer  >
                        <BookImage src={(book?.photo_url || BookBackground)} alt="book cover" />
                    </BookImageContainer>
                    <Box display={"flex"} rowGap={"12px"} flexDirection={"column"}>
                        <Button fullWidth variant="contained">
                            {
                                parseFloat(`${book?.price}`) > 0
                                    ? `COMPRAR POR ${toBRL(parseFloat(`${book?.price}`))}`
                                    : "GRATUITO"
                            }
                        </Button>
                        <Button onClick={() => navigate("content")} fullWidth variant="outlined">LER AMOSTRA GRATUITA</Button>
                    </Box>
                </Box>
                <BookDetailsContainer>
                    <h1>{book?.name}</h1>
                    <h2>{book?.user?.name}</h2>
                    <Box display={"flex"} flexWrap={"wrap"} gap={"8px"}>
                        {book?.categories?.map((c) => <CategoryBadge>{c.name}</CategoryBadge>)}
                    </Box>

                    <BookRatingContainer>
                        <BookRating
                            value={book?.user_raters?.[0]?.assessment?.number}
                            onChange={(event, newValue) => {
                                sendAssessment(newValue as number)
                            }}
                            precision={0.5}
                        />
                        <Typography component="span" sx={{ font: t => t.font.sm, color: t => t.palette.secondary[700] }}>( {`${book?.rating} de ${book?.total_users_rating} avaliações`}  )</Typography>
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
            <Comments bookId={book?.id} bookName={book?.name} />
        </Content>
    )
}