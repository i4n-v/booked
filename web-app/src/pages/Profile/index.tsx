import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useUser from "../../services/useUser";
import { BooksActions, BooksCardsContainer, BooksContainer, Container, IdentityInfo, InfoContainer, LibraryInfo, LibraryInfoBadge, ProfileImage, ProfileImageBox, UserProfileInfo } from "./styles";
import { useQuery } from "react-query";
import { Button, Divider } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { BookCard } from "../../components/Cards";
import { cards } from "../Home";
import BooksForm from "../Books/Form";

export default function Profile() {
    const { getUser } = useUser();
    const [authData] = useContext(AuthContext)
    const { data: user } = useQuery('getUser', () => getUser(authData?.userData?.id as string), {
        retry: false,
        refetchOnWindowFocus: false
    })

    const [open, handleOpen] = useState(false)

    return (
        <Container>
            <BooksForm open={true} handleClose={handleOpen} />
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
                    <Button sx={{ height: '42px' }} onClick={() => handleOpen(true)} variant="contained">Publicar</Button>
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