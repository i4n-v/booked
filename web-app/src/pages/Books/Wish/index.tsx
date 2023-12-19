import { useState } from "react";
import { Typography, Divider, Box, Pagination } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../styles";
import { BookCard } from "../../../components/Cards";
import { useQuery } from "react-query";
import useWishes from "../../../services/useWishe";
import { useLocation, useNavigate } from "react-router-dom";
import { ICategory } from "../../../commons/ICategory";
import { BooksFilters } from "../Actions/types";
import BooksActions from "../Actions";

export default function BooksExplore() {
  const { getWishes } = useWishes();
  const { state } = useLocation();
  const [filters, setFilters] = useState<Partial<BooksFilters>>();
  const [page, setPage] = useState(1);
  const { data: wishlist } = useQuery(
    ["getWishes", [state, filters, page]],
    () => getWishes({ search: state, ...filters, page })
  );

  const navigate = useNavigate();

  const filterBooks = (filters: any) => {
    const categories = filters?.categories?.map((v: ICategory) => v.id);
    setFilters({ ...filters, categories });
  };

  return (
    <Content>
      <Typography component={"h1"}>Lista de desejos</Typography>
      <BooksContainer>
        <BooksActions filter handleFilter={filterBooks} />
        <Divider />
        <Box display={"flex"} flexDirection={"column"} rowGap={4}>
          {wishlist?.items.length ? (
            <BooksCardsContainer>
              {wishlist?.items?.map((book, index) => {
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
                    onClick={() => navigate(`/explore/${book.id}`)}
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
              Nenhum livro encontrado na lista de desejos.
            </Typography>
          )}
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination
              page={page}
              onChange={(_, value) => setPage(value)}
              count={wishlist?.totalPages}
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </BooksContainer>
    </Content>
  );
}
