import { useContext, useState } from "react";
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
  FollowButton,
} from "./styles";
import { useMutation, useQuery } from "react-query";
import { Box, Divider, Pagination, Typography } from "@mui/material";
import { BookCard } from "../../components/Cards";
import BooksForm from "../Books/Form";
import useBook from "../../services/useBook";
import IBook from "../../commons/IBook";
import { BooksCardsContainer, BooksContainer } from "../Books/styles";
import DefaultImage from "../../assets/SVG/account.svg";
import BooksActions from "../Books/Actions";
import { BooksFilters } from "../Books/Actions/types";
import useNotifier from "../../helpers/Notify";
import { useNavigate, useParams } from "react-router-dom";
import { Follow, FollowWhite } from "../../assets/SVG";
import { AuthContext } from "../../contexts/AuthContext";
import useFollow from "../../services/useFollow";

export default function Profile() {
  const { getUser } = useUser();
  const params: any = useParams();
  const [authData] = useContext(AuthContext);
  const { getBooks, deleteBook } = useBook();
  const { followUser, unfollowUser } = useFollow();
  const [open, handleOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, handleFilters] = useState<Partial<BooksFilters>>({});
  const [bookToEdit, setBookToEdit] = useState<string>();
  const notify = useNotifier();
  const navigate = useNavigate();

  const { data: user, refetch: userRefetch } = useQuery(
    "getUser",
    () => getUser(params.userId),
    {
      enabled: !!params.userId,
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { data: books, refetch: booksRefetch } = useQuery(
    ["getUserBooks", [filters, page]],
    () => getBooks({ user_id: params.userId, ...filters, page, limit: 12 }),
    {
      enabled: !!params.userId,
      refetchOnWindowFocus: false,
    }
  );

  const deleteBookMutation = useMutation(deleteBook);
  const unfollowMutation = useMutation(unfollowUser);
  const followMutation = useMutation(followUser);

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

  function togleFollow() {
    if (user?.followed) {
      unfollowMutation.mutate(user?.id as string, {
        onSuccess(response) {
          notify(response.message, "success");
          userRefetch();
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    } else {
      followMutation.mutate(user?.id as string, {
        onSuccess(response) {
          notify(response.message, "success");
          userRefetch();
        },
        onError(error: any) {
          notify(error.message, "error");
        },
      });
    }
  }

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
            <Typography component="span" id="name">
              {user?.name}
            </Typography>
            <Typography component="span" id="dot" />
            <Typography component="span" id="user_name">
              @{user?.user_name}
            </Typography>
          </IdentityInfo>
          <LibraryInfo>
            {authData?.userData?.id !== params.userId && (
              <FollowButton
                endIcon={user?.followed ? <FollowWhite /> : <Follow />}
                variant={user?.followed ? "contained" : "outlined"}
                onClick={togleFollow}
              >
                {user?.followed ? "Seguindo" : "Seguir"}
              </FollowButton>
            )}
            <LibraryInfoBadge>
              <Typography component="span">{user?.total_followers}</Typography>
              Seguidores
            </LibraryInfoBadge>
            <LibraryInfoBadge>
              <Typography component="span">{user?.total_books}</Typography>
              Livros
            </LibraryInfoBadge>
            <LibraryInfoBadge>
              <Typography component="span">{user?.total_acquitions}</Typography>
              Bibliotecas
            </LibraryInfoBadge>
          </LibraryInfo>
          <p>{user?.description}</p>
        </UserProfileInfo>
      </InfoContainer>
      <BooksContainer>
        <BooksActions
          filter
          publish={authData?.userData?.id !== params.userId}
          handleOpenPublish={handleOpen}
          handleFilter={handleFilters}
        />
        <Divider />
        <Box display={"flex"} flexDirection={"column"} rowGap={4}>
          {books?.items.length ? (
            <BooksCardsContainer>
              {books?.items.map((book: IBook, index) => {
                return (
                  <BookCard
                    author={book.user?.name}
                    rating={book.rating}
                    price={book.price}
                    ratingQuantity={book.total_users_rating}
                    showWishe={authData?.userData?.id !== params.userId}
                    title={book.name}
                    image={book.photo_url}
                    size="md"
                    key={`${book.id}-${index}`}
                    onClick={() => navigate(`/explore/${book.id}`)}
                    actionsOptions={
                      authData?.userData?.id === params.userId
                        ? [
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
                          ]
                        : undefined
                    }
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
                color: (t) => t.palette.secondary[800],
              }}
            >
              Nenhum livro publicado.
            </Typography>
          )}
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination
              page={page}
              onChange={(_, value) => setPage(value)}
              count={books?.totalPages}
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </BooksContainer>
    </ContainerProfile>
  );
}
