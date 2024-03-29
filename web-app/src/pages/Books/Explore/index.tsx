import { Box, Divider, Pagination, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../styles";
import { BookCard } from "../../../components/Cards";
import IBook from "../../../commons/IBook";
import { useQuery } from "react-query";
import useBook from "../../../services/useBook";
import { useLocation, useNavigate } from "react-router-dom";
import BooksActions from "../Actions";
import { BooksFilters } from "../Actions/types";
import { useState } from "react";
import { ICategory } from "../../../commons/ICategory";

export default function BooksExplore() {
  const { getBooks } = useBook();
  const { state } = useLocation();
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState<Partial<BooksFilters>>();
  const { data: books } = useQuery(["getBooks", [state, filters, page]], () =>
    getBooks({ search: state, ...filters, page, limit: 12 }),
    {
      keepPreviousData: true,
    }
  );
  const navigate = useNavigate();

  const filterBooks = (filters: any) => {
    const categories = filters?.categories?.map((v: ICategory) => v.id);
    setFilters({ ...filters, categories });
  };
  return (
    <Content>
      <Typography component={"h1"}>Encontre sua próxima história</Typography>
      <BooksContainer>
        <BooksActions filter handleFilter={filterBooks} />
        <Divider />
        <Box display={'flex'} flexDirection={"column"} rowGap={4}>
          {books?.items.length ? (
            <BooksCardsContainer>
              {books?.items?.map((book: IBook, index) => {
                return (
                  <BookCard
                    key={book.id}
                    bookId={book.id}
                    author={book.user?.name}
                    rating={book.rating}
                    price={book.price}
                    wished={book.wished}
                    ratingQuantity={book.total_users_rating}
                    title={book.name}
                    image={book.photo_url}
                    size="md"
                    onClick={() => navigate(`${book.id}`)}
                  ></BookCard>
                );
              })}
            </BooksCardsContainer>

          ) : (
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                padding: "15px",
                color: (t) => t.palette.secondary[800],
              }}
            >
              Nenhum livro encontrado.
            </Typography>
          )}
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination page={page} onChange={(_, value) => setPage(value)} count={books?.totalPages} showFirstButton showLastButton />
          </Box>
        </Box>
      </BooksContainer>
    </Content>
  );
}
