import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Teste from "../../components/Card";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "@mui/icons-material";
import introductionBg from "../../assets/IMG/introduction-bg.png"
export default function Home() {
  const methods = useForm({
    defaultValues: {
      faq: "",
    },
  });
  return (
    <>
      <>
        <Grid
          container
          width={"100%"}
          sx={{ backgroundColor: "secondary.light" }}
        >
          <Grid item xs={12}>
            <Box
              height="100vh"
              position="relative"
              display="flex"
              justifyContent="left"
              alignItems="center"
              overflow="hidden"
              sx={{
                backgroundImage: `url(${introductionBg})`
              }}
            >
              <Box display={"flex"} flexDirection="column" paddingLeft={"5%"}>
                <Typography
                  variant="h1"
                  sx={{
                    font: (t) => t.font.xxl,
                    color: (t) => t.palette.secondary[50],
                    zIndex: 1000,
                  }}
                >
                  Conheça um{" "}
                  <span style={{ color: "#9b51e0" }}>
                    mundo
                    <br />
                    novo
                  </span>{" "}
                  em cada livro!
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    font: (t) => t.font.lg,
                    color: (t) => t.palette.secondary.light,
                    zIndex: 1000,
                  }}
                >
                  Publique seus <b style={{ color: "#9b51e0" }}>próprios</b>{" "}
                  livros!
                </Typography>
                <Box zIndex={100} width={'50%'}>
                  <FormProvider {...methods}>
                    <Input name="faq" label={"Buscar..."} icon={{right: <Search />}} />
                  </FormProvider>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              minHeight: "95vh",
              display: "flex",
              flexDirection: "column",
              pl: 8,
              py: 10,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: (t) => t.palette.secondary.main,
                font: (t) => t.font.xl,
                textAlign: "left",
              }}
            >
              Explore os <span style={{ color: "#9b51e0" }}>tops 10</span>{" "}
              livros melhores <br></br>avaliados na plataforma.
            </Typography>
            <Teste></Teste>
          </Grid>

          <Grid item xs={12} position="relative" sx={{ minHeight: "85vh" }}>
            <Box
              sx={{
                height: "80%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                backgroundColor: (t) => t.palette.secondary.main,
              }}
            >
              <Box sx={{ padding: 8 }}>
                <Typography
                  variant="h2"
                  sx={{
                    color: (t) => t.palette.secondary[50],
                    font: (t) => t.font.xl,
                    textAlign: "left",
                  }}
                >
                  Ainda não conhece a nossa{" "}
                  <span style={{ color: "#9b51e0" }}>
                    <br></br>Comunidade?
                  </span>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    font: (t) => t.font.md,
                    color: (t) => t.palette.secondary[300],
                  }}
                >
                  Somos uma gigante comunidade de leitores cheios de vontade de
                  conhecer um novo mundo em cada livro que lêmos, publicados por
                  autores repletos de criatividade, vem fazer parte desse
                  universo!
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ font: (t) => t.font.xs, mt: 4 }}
                >
                  Cadastre-se já
                </Button>
              </Box>
              <div>
                <img src="img-books.svg" alt="" />
              </div>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              height: "85vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "50%", pl: 28 }}>
              <img src="help.svg" alt="Imagem" />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography
                variant="h2"
                sx={{
                  color: (t) => t.palette.secondary.main,
                  font: (t) => t.font.xl,
                  textAlign: "left",
                }}
              >
                Você possui alguma{" "}
                <span style={{ color: "#9b51e0" }}>
                  <br></br>dúvida?
                </span>
              </Typography>
              <Typography
                variant="h5"
                pb={8}
                sx={{
                  font: (t) => t.font.md,
                  color: (t) => t.palette.secondary[800],
                }}
              >
                Buscamos sanar toda e qualquer questão que você tiver, nossos
                profissionáis estarão sempre a disposição para solucionar o seu
                problema. Mas antes de nos contatar dê uma olhada nas{" "}
                <b style={{ color: "#9b51e0" }}>dúvidas frequentes</b> dos
                nossos usuários.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    </>
  );
}
