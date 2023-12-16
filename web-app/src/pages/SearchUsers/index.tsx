import { Box, Divider, Pagination, Typography } from "@mui/material";
import Content from "../../components/Layout/Content/styles";
import { BooksCardsContainer, BooksContainer } from "../Books/styles";
import { ProfileCard } from "../../components/Cards";
import IUser from "../../commons/IUser";
import { useQuery } from "react-query";
import useUser from "../../services/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BooksExplore() {
  const { getUsers } = useUser();
  const { state } = useLocation();
  const [page, setPage] = useState(1);
  const { data: users, isFetching } = useQuery(["getUsers", [state, page]], () =>
    getUsers({ search: state, page, limit: 12 }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <Content>
      <Typography component={"h1"}>Usuários encontrados</Typography>
      <BooksContainer>
        <Divider />
        <Box display={'flex'} flexDirection={"column"} rowGap={4}>
          {users?.items.length ? (
            <BooksCardsContainer style={{ gridTemplateColumns: "repeat(3, min-content)" }}>
              {users?.items?.map((user: IUser, index) => {
                return (
                  <ProfileCard
                    name={user.name}
                    user_name={user.user_name}
                    description={user.description}
                    photo_url={user.photo_url}
                    size="md"
                  ></ProfileCard>
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
              Nenhum usuário encontrado.
            </Typography>
          )}
          <Box display={"flex"} justifyContent={"center"}>
            <Pagination page={page} onChange={(_, value) => setPage(value)} count={users?.totalPages} showFirstButton showLastButton />
          </Box>
        </Box>
      </BooksContainer>
    </Content>
  );
}