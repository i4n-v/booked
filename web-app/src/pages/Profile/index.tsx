import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useUser from "../../services/useUser";
import { BooksActions, BooksCardsContainer, BooksContainer, Container, IdentityInfo, InfoContainer, LibraryInfo, LibraryInfoBadge, ProfileImage, ProfileImageBox, UserProfileInfo } from "./styles";
import { useQuery } from "react-query";
import { Button, Divider } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { BookCard } from "../../components/Cards";
import { cards } from "../Home";

export default function Profile() {
    const { getUser } = useUser();
    const [authData] = useContext(AuthContext)
    const { data: user } = useQuery('getUser', () => getUser(authData?.userData?.id), {
        retry: false,
        refetchOnWindowFocus: false
    })
    return (
        <Container>
            <InfoContainer>
                <ProfileImageBox>
                    <ProfileImage src={user?.photo_url} />
                </ProfileImageBox>
                <UserProfileInfo>
                    <IdentityInfo>
                        <span id="name">{user?.name}</span>
                        <span id="dot" />
                        <span id="user_name">@{user?.user_name}</span>
                    </IdentityInfo>
                    <LibraryInfo>
                        <LibraryInfoBadge><span>{2}</span>Livros</LibraryInfoBadge>
                        <LibraryInfoBadge><span>{2}</span>Bibliotecas</LibraryInfoBadge>
                    </LibraryInfo>
                    <p>{user?.description}</p>
                </UserProfileInfo>
            </InfoContainer>
            <BooksContainer >
                <BooksActions>
                    <Button sx={{ height: '42px', color: (t) => t.palette.secondary.main, display: 'flex', columnGap: '8px' }}><Tune color="primary" fontSize={'large'} /> Filtros</Button>
                    <Button sx={{ height: '42px' }} variant="contained">Publicar</Button>
                </BooksActions>
                <Divider />
                <BooksCardsContainer>
                    {cards.map((book) => {
                        return <BookCard
                            author={book.author}
                            rating={book.rating}
                            ratingQuantity={book.ratingQuantity}
                            title={book.title}
                            image={book.image}
                            size="md"
                            key={book.title}
                        ></BookCard>
                    })}
                </BooksCardsContainer>
            </BooksContainer>
        </Container>
    )
}