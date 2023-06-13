import { Divider, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../styles";
import { BookCard } from "../../../components/Cards";
import IBook from "../../../commons/IBook";
import { useQuery } from "react-query";
import useBook from "../../../services/useBook";
import { useLocation } from "react-router-dom";
import BooksActions from "../Actions";
import { BooksFilters } from "../Actions/types";
import { useState } from "react";
import { ICategory } from "../../../commons/ICategory";

export default function BooksExplore() {
    const { getBooks } = useBook()
    const { state } = useLocation();
    const [filters,setFilters] = useState<Partial<BooksFilters>>()
    const { data: books } = useQuery(['getBooks', [state,filters]], () => getBooks({ search: state, ...filters }))


    const filterBooks = (filters: any) => {
        const categories = filters?.categories?.map( (v:ICategory) => v.id)
        setFilters({...filters,categories})
    }
    return (
        <Content >
            <Typography component={'h1'}>Resultados</Typography >
            <BooksContainer >
                <BooksActions filter handleFilter={filterBooks} />
                <Divider />
                {books ? <BooksCardsContainer>
                    {books?.items?.map((book: IBook, index) => {
                        return <BookCard
                            author={book.user?.name}
                            rating={1}
                            price={book.price}
                            ratingQuantity={1}
                            title={book.name}
                            image={book.photo_url}
                            size="md"
                            key={book.id}
                        ></BookCard>
                    })}
                </BooksCardsContainer> : null}
            </BooksContainer>
        </Content>
    )
}