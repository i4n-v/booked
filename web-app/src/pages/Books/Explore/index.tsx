import { Button, Divider, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksActions, BooksCardsContainer, BooksContainer } from "../styles";
import { Tune } from "@mui/icons-material";
import { BookCard } from "../../../components/Cards";
import IBook from "../../../commons/IBook";
import { useQuery } from "react-query";
import useBook from "../../../services/useBook";
import { useParams } from "react-router-dom";

export default function BooksExplore() {
    const { getBooks } = useBook()
    const { search } = useParams();
    const { data: books } = useQuery(['getBooks', search], () => getBooks({ search }))
    return (
        <Content >
            <Typography component={'h1'}>Resultados</Typography >
            <BooksContainer >
                <BooksActions>
                    <Button sx={{
                        height: '42px',
                        color: (t) => t.palette.secondary.main,
                        display: 'flex',
                        font: (t) => t.font.xs,
                        columnGap: '8px',
                        padding: '1px'
                    }}>
                        <Tune color="primary" fontSize={'large'} />
                        Filtros
                    </Button>
                </BooksActions>
                <Divider />
                <BooksCardsContainer>
                    {books?.items.map((book: IBook, index) => {
                        return <BookCard
                            author={book.user?.name}
                            rating={1}
                            price={book.price}
                            ratingQuantity={1}
                            title={book.name}
                            image={book.photo_url}
                            size="md"
                            key={`book-${index}`}
                        ></BookCard>
                    })}
                </BooksCardsContainer>
            </BooksContainer>
        </Content>
    )
}