import React, { useEffect, useState } from "react";
import { Typography, Divider } from "@mui/material";
import Content from "../../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../styles";
import { BookCard } from "../../../components/Cards";
import IBook from "../../../commons/IBook";
import { useQuery } from "react-query";
import useBook from "../../../services/useBook";
import useWishes from "../../../services/useWishe";
import { useLocation, useNavigate } from "react-router-dom";

export default function BooksExplore() {
  const { getBooks } = useBook();
  const { state } = useLocation();
  const { data: books } = useQuery(["getBooks", [state]], () => getBooks({ search: state }));
  const navigate = useNavigate();

  const { getWishes } = useWishes();
  const [wishlist, setWishlist] = useState<IBook[]>([]);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const wishlistData = await getWishes();

        if (Array.isArray(wishlistData)) {
          setWishlist(wishlistData);
        }
      } catch (error) {
        console.error("Erro ao buscar lista de desejos", error);
      }
    }

    fetchWishlist();
  }, []);

  const wishlistBooks = books?.items.filter((book: IBook) =>
    wishlist.some((wishlistItem: IBook) => wishlistItem.id === book.id)
  );

  return (
    <Content>
      <Typography component={"h1"}>Lista de desejos</Typography>
      <BooksContainer>
        <Divider />
        {wishlistBooks && wishlistBooks.length ? (
          <BooksCardsContainer>
            {wishlistBooks.map((book: IBook, index) => {
              return (
                <BookCard
                  author={book.user?.name}
                  rating={book.rating}
                  price={book.price}
                  ratingQuantity={book.total_users_rating}
                  title={book.name}
                  image={book.photo_url}
                  size="md"
                  key={book.id}
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
            Nenhum livro encontrado na lista de desejos.
          </Typography>
        )}
      </BooksContainer>
    </Content>
  );
}
