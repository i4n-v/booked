import { Box, Divider, Pagination, Typography } from "@mui/material";
import Content from "../../components/Layout/Content/styles";
import { UsersCardsContainer, UsersContainer } from "./styles";
import { ProfileCard } from "../../components/Cards";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useUser from "../../services/useUser";
import IUser from "../../commons/IUser";

export default function Users() {
  const { getUsers } = useUser();
  const { state } = useLocation();
  const [page, setPage] = useState(1);

  const { data: users } = useQuery(
    ["getUsers", [state, page]],
    () => getUsers({ name: state, page, limit: 12 }),
    {
      keepPreviousData: true,
    }
  );

  const navigate = useNavigate();

  return (
    <Content>
      <Typography component={"h1"}>Usuários encontrados</Typography>
      <UsersContainer>
        <Divider />
        <Box display={"flex"} flexDirection={"column"} rowGap={4}>
          {users?.items.length ? (
            <UsersCardsContainer>
              {users?.items?.map((user: IUser) => {
                return (
                  <ProfileCard
                    key={user.id}
                    id={user.id!}
                    followed={user.followed}
                    name={user.name}
                    user_name={user.user_name}
                    description={user.description}
                    photo_url={user.photo_url}
                    onClick={() => navigate(`/profile/${user.id}`)}
                  />
                );
              })}
            </UsersCardsContainer>
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
            <Pagination
              page={page}
              onChange={(_, value) => setPage(value)}
              count={users?.totalPages}
              showFirstButton
              showLastButton
            />
          </Box>
        </Box>
      </UsersContainer>
    </Content>
  );
}
