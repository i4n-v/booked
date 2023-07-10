import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useUser from "../../services/useUser";
import {
  ContainerProfile,
  IdentityInfo,
  InfoContainer,
  LibraryInfo,
  LibraryInfoBadge,
  ProfileImage,
  ProfileImageBox,
  UserProfileInfo,
} from "./styles";
import { useMutation, useQuery } from "react-query";
import { Divider, Typography } from "@mui/material";
import { BookCard } from "../../components/Cards";
import BooksForm from "../Books/Form";
import useBook from "../../services/useBook";
import IBook from "../../commons/IBook";
import { BooksCardsContainer, BooksContainer } from "../Books/styles";
import DefaultImage from "../../assets/SVG/account.svg";
import BooksActions from "../Books/Actions";
import { BooksFilters } from "../Books/Actions/types";
import useNotifier from "../../helpers/Notify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { getUser } = useUser();
  const { getBooks, deleteBook } = useBook();
  const [authData] = useContext(AuthContext);
  const [open, handleOpen] = useState(false);
  const [filters, handleFilters] = useState<Partial<BooksFilters>>({});
  const [bookToEdit, setBookToEdit] = useState<string>();
  const notify = useNotifier();
  const navigate = useNavigate();
  const { data: user, refetch: userRefetch } = useQuery(
    "getUser",
    () => getUser(authData?.userData?.id as string),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: books, refetch: booksRefetch } = useQuery(
    ["getUserBooks", [filters]],
    () => getBooks({ user_id: authData?.userData?.id, ...filters }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const deleteBookMutation = useMutation(deleteBook);

  const deleteMutation = (id: string) => {
    deleteBookMutation.mutate(id, {
      onSuccess(data) {
        notify(data.message);
        booksRefetch();
        userRefetch();
      },
      onError(error: any) {
        notify(error.message);
      },
    });
  };

  return (
    <ContainerProfile>
      <BooksForm
        open={open}
        editBook={bookToEdit}
        handleClose={() => {
          handleOpen(false);
          setBookToEdit(undefined);
          booksRefetch();
          userRefetch();
        }}
      />
      <InfoContainer>
        <ProfileImageBox>
          <ProfileImage src={user?.photo_url || DefaultImage} />
        </ProfileImageBox>
        <UserProfileInfo>
          <IdentityInfo>
            <span id="name">{user?.name}</span>
            <span id="dot" />
            <span id="user_name">@{user?.user_name}</span>
          </IdentityInfo>
          <LibraryInfo>
            <LibraryInfoBadge>
              <span>{user?.total_books}</span>Livros
            </LibraryInfoBadge>
            <LibraryInfoBadge>
              <span>{user?.total_acquitions}</span>Bibliotecas
            </LibraryInfoBadge>
          </LibraryInfo>
          <p>{user?.description}</p>
        </UserProfileInfo>
      </InfoContainer>
      <BooksContainer>
        <BooksActions
          filter
          publish
          handleOpenPublish={handleOpen}
          handleFilter={handleFilters}
        />
        <Divider />

        {books?.items.length ? (
          <BooksCardsContainer>
            {books?.items.map((book: IBook, index) => {
              return (
                <BookCard
                  author={book.user?.name}
                  rating={book.rating}
                  price={book.price}
                  ratingQuantity={book.total_users_rating}
                  title={book.name}
                  image={book.photo_url}
                  size="md"
                  key={`${book.id}-${index}`}
                  onClick={() => navigate(`/explore/${book.id}`)}
                  actionsOptions={[
                    {
                      label: "Editar",
                      handler() {
                        setBookToEdit(book.id);
                      },
                    },
                    {
                      label: "Deletar",
                      handler() {
                        deleteMutation(book.id as string);
                      },
                    },
                  ]}
                />
              );
            })}
          </BooksCardsContainer>
        ) : (
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              padding: "15px",
              color: (t) => t.palette.primary[600],
            }}
          >
            Nenhum livro publicado.
          </Typography>
        )}
      </BooksContainer>
    </ContainerProfile>
  );
}
