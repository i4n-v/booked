import { Box, Divider, Pagination, Typography } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../styles";
import BooksActions from "../Actions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BooksFilters } from "../Actions/types";
import { useQuery } from "react-query";
import { ICategory } from "../../../commons/ICategory";
import { BookCard } from "../../../components/Cards";
import useAcquisition from "../../../services/useAcquisition";
import { IAcquisitions } from "../../../commons/IAcquisitions";

export default function Acquisitions() {
  const { getAcquisitions } = useAcquisition();
  const [filters, setFilters] = useState<Partial<BooksFilters>>({});
  const navigate = useNavigate();
  const [page, setPage] = useState(1)

  const { data: acquisitions } = useQuery(
    ["getAcquisitions", filters],
    () => getAcquisitions({ page, limit: 12 }),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const filterBooks = (filters: any) => {
    const categories = filters?.categories?.map((v: ICategory) => v.id);
    setFilters({ ...filters, categories });
  };

  return (
    <Content>
      <Typography component={"h1"}>Biblioteca</Typography>
      <BooksContainer>
        <BooksActions
          filter
          handleFilter={filterBooks}
          dateLabels={{
            minDate: "Data mínima",
            maxDate: "Data máxima",
          }}
        />
        <Divider />
        <Box display={'flex'} flexDirection={"column"} rowGap={4}>
          <BooksCardsContainer>
            {acquisitions?.items.map((book: IAcquisitions) => {
              return (
                <BookCard
                  author={book.user.name}
                  rating={book.rating}
                  price={book.price}
                  ratingQuantity={book.total_users_rating}
                  title={book.name}
                  image={book.photo_url}
                  size="md"
                  key={book.name}
                  onClick={() => navigate(`/explore/${book.id}`)}
                  showPrice={false}
                  showWishe={false}
                />
              );
            })}
          </BooksCardsContainer>
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination page={page} onChange={(_, value) => setPage(value)} count={acquisitions?.totalPages} showFirstButton showLastButton />
          </Box>
        </Box>
      </BooksContainer>
    </Content>
  );
}
