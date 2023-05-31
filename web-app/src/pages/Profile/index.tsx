import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useUser from "../../services/useUser";
import { ContainerProfile, IdentityInfo, InfoContainer, LibraryInfo, LibraryInfoBadge, ProfileImage, ProfileImageBox, UserProfileInfo } from "./styles";
import { useQuery } from "react-query";
import { Button, Divider } from "@mui/material";
import { Tune } from "@mui/icons-material";
import { BookCard } from "../../components/Cards";
import BooksForm from "../Books/Form";
import useBook from "../../services/useBook";
import IBook from "../../commons/IBook";
import { BooksActions, BooksCardsContainer, BooksContainer } from "../Books/styles";

export default function Profile() {
    const { getUser } = useUser();
    const { getBooks } = useBook()
    const [authData] = useContext(AuthContext)
    const { data: user } = useQuery('getUser', () => getUser(authData?.userData?.id as string), {
        retry: false,
        refetchOnWindowFocus: false
    })

    const { data: books } = useQuery('getUserBooks', () => getBooks({ user_id: authData?.userData?.id }))

    const [open, handleOpen] = useState(false)

    return (
        <ContainerProfile>
            <BooksForm open={open} handleClose={handleOpen} />
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
                    {books?.items.map((book: IBook) => {
                        return <BookCard
                            author={book.user?.name}
                            rating={1}
                            price={book.price}
                            ratingQuantity={1}
                            title={book.name}
                            image={book.photo_url}
                            size="md"
                            key={book.name}
                        ></BookCard>
                    })}
                </BooksCardsContainer>
            </BooksContainer>
        </ContainerProfile>
    )
}