import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Account,
  Config,
  DarkLogo,
  Logout,
  Menu,
  User,
  Book,
} from "../../../assets/SVG";
import {
  Badge,
  Button,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { NavBarProps } from "./types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../../Dropdown";
import { AuthContext } from "../../../contexts/AuthContext";
import useAuth from "../../../services/useAuth";
import { useMutation } from "react-query";
import Cookies from "js-cookie";
import { AuthActionsKind } from "../../../contexts/AuthContext/types";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../Input";
import { ChatBubble, CurrencyExchange, Search } from "@mui/icons-material";
import socket from "../../../configs/socket";

export default function NavBar({ logged }: NavBarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [authData, authDispatch] = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const [pendingChats, setPendingChats] = useState()
  const [pendingSolicitations, setPendingSolicitations] = useState(2)
  const { logout } = useAuth();
  const logoutMutation = useMutation(logout);

  const MenuItem = styled(Button)(({ theme }) => ({
    font: theme.font.md,
    color: theme.palette.secondary[800],
    textTransform: "none",
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.primary[700],
    },
  }));

  const NavigationContainer = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1400px",
    "#burguer-menu": {
      display: "none",
      cursor: "pointer",
    },
    "#search": {
      flex: "1",
      padding: "18px auto",
      paddingLeft: "32px",
    },
    [theme.breakpoints.down("md")]: {
      "#burguer-menu": {
        display: "inline-flex",
      },
      "& > #unlogged": {
        display: "none",
      },
      "& > #logged": {
        "& > button": {
          display: "none",
        },
        "& > button + button": {
          display: "inline-flex",
        },
      },
    },
  }));

  const navigationOptions = [
    {
      label: "Entrar",
      handler: () => navigate("/login"),
    },
    {
      label: "Registrar",
      handler: () => navigate("/register"),
    },
    {
      label: "Explorar",
      handler: () => navigate("/explore"),
    },
  ];

  const loggedNavigationOptions = [
    {
      label: "Perfil",
      icon: <User />,
      handler: () => navigate("/profile"),
    },
    {
      label: "Biblioteca",
      icon: <Book />,
      handler: () => navigate("acquisitions"),
    },
    {
      label: "Configurações",
      icon: <Config />,
      handler: () => navigate("profile/settings"),
    },
    {
      label: "Sair",
      icon: (
        <Logout
          style={{
            marginLeft: "4px",
          }}
        />
      ),
      handler: () => {
        logoutMutation.mutate(undefined, {
          onSuccess: () => {
            localStorage.clear();
            Cookies.remove("x-access-token");
            authDispatch({
              type: AuthActionsKind.SET_USER_DATA,
              payload: { userData: undefined },
            });
            navigate("/login", { replace: true });
          },
        });
      },
    },
  ];

  const form = useForm({
    defaultValues: {
      search: "",
    },
  });

  const search = form.handleSubmit(({ search }) => {
    navigate(`/explore`, { replace: true, state: search });
  });

  useEffect(() => {
    if (!authData?.valid) return
    socket.on(`pending-chats-${authData?.userData?.id}`, (arg) => {
      setPendingChats(arg)
    });

    return () => {
      socket.off(`pending-chats-${authData?.userData?.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData])

  return (
    <AppBar
      elevation={1}
      position="sticky"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: "20px",
        minHeight: "80px",
      }}
    >
      <NavigationContainer disableGutters>
        <Link to="/">
          <DarkLogo />
        </Link>
        {!["/", "/login", "/register"].includes(location.pathname) ? (
          <Box id={"search"}>
            <FormProvider {...form}>
              <form onSubmit={search}>
                <Input
                  type="text"
                  name="search"
                  placeholder="Buscar..."
                  inputProps={{ maxLength: 255 }}
                  icon={{
                    right: (
                      <IconButton color="primary" type="submit">
                        <Search />
                      </IconButton>
                    ),
                  }}
                />
              </form>
            </FormProvider>
          </Box>
        ) : null}
        {!logged ? (
          <Box id="unlogged" display={"flex"} columnGap={3}>
            <MenuItem onClick={() => navigate("/explore")}>Explorar</MenuItem>
            <MenuItem onClick={() => navigate("/login")}>Entrar</MenuItem>
            <Button
              variant="outlined"
              sx={{
                font: (t) => t.font.sm,
                textTransform: "none",
              }}
              onClick={() => navigate("/register")}
            >
              Registre-se
            </Button>
          </Box>
        ) : (
          <Box id="logged" display={"flex"} columnGap={3}>
            <MenuItem onClick={() => navigate("/explore")}>Explorar</MenuItem>
            <IconButton
              id="profile-menu"
              sx={{
                display: "flex",
                alignItems: "center",
                columnGap: "8px",
                "&:hover": {
                  background: "initial",
                },
              }}
              onClick={() => setDropdown(true)}
            >
              <Typography
                sx={{
                  font: theme.font.md,
                  color: theme.palette.secondary[800],
                }}
              >
                {authData?.userData?.user_name}
              </Typography>
              <Account />
            </IconButton>

            <IconButton sx={{}} onClick={() => navigate("/chat")}>
              <ChatBubble color="primary" />
              <Typography
                component={"div"}
                sx={{
                  position: "absolute",
                  top: 3,
                  right: 10,
                }}
              >
                <Badge badgeContent={pendingChats} max={99} color="error" />
              </Typography>
            </IconButton>

            <IconButton sx={{}} onClick={() => navigate("/solicitations")}>
              <CurrencyExchange color="primary" />
              <Typography
                component={"div"}
                sx={{
                  position: "absolute",
                  top: 3,
                  right: 10,
                }}
              >
                <Badge badgeContent={pendingSolicitations} max={99} color="error" />
              </Typography>
            </IconButton>
          </Box>
        )}
        {!logged && (
          <IconButton id="burguer-menu" onClick={() => setDropdown(true)}>
            <Menu />
          </IconButton>
        )}
        <Dropdown
          open={dropdown}
          anchorId={logged ? "profile-menu" : "burguer-menu"}
          options={!logged ? navigationOptions : loggedNavigationOptions}
          handleClose={() => setDropdown(false)}
        />
      </NavigationContainer>
    </AppBar>
  );
}
