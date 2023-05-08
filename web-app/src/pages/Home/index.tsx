import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "@mui/icons-material";
import introducitionBg from "../../assets/IMG/introduction-bg.png";
import bookcase from "../../assets/IMG/bookcase.png";
import help from "../../assets/SVG/help.svg";
import { Link } from "react-router-dom";
import { Carousel } from "../../components";
import { BookCard } from "../../components/Cards";

const IntroductionContainer = styled(Box)(({ theme }) => ({
  background: `url(${introducitionBg})`,
  backgroundSize: "cover",
  backgroundPosition: "50% 58%",
  backgroundRepeat: "no-repeat",
  height: "654px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "80px",
  padding: "20px",
  position: "relative",
  "& > .title": {
    maxWidth: "1400px",
    width: "100%",
    zIndex: 2,
    "& > h1": {
      font: theme.font.xxl,
      color: theme.palette.secondary[50],
      maxWidth: "1030px",
    },
    "& > h1 + p": {
      font: theme.font.lg,
      color: theme.palette.secondary.light,
      zIndex: 1000,
      mt: "12px",
      opacity: 0.5,
    },
    "& span": {
      font: "inherit",
      color: theme.palette.primary[700],
    },
  },
  [theme.breakpoints.down("md")]: {
    "& > .title > h1": {
      font: theme.font.xl,
      maxWidth: "600px",
    },
    "& > .title > h1 + p": {
      font: theme.font.md,
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .title > h1": {
      font: theme.font.lg,
      maxWidth: "400px",
    },
    "& > .title > h1 + p": {
      font: theme.font.sm,
    },
  },
}));

const CallToActionContainer = styled(Box)(({ theme }) => ({
  height: "800px",
  background: theme.palette.secondary.A200,
  boxShadow: `inset 0 80px ${theme.palette.secondary[100]}, inset 0 -80px ${theme.palette.secondary[100]}`,
  padding: "0 20px",
  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    "& > .container": {
      maxWidth: "678px",
      "& h2": {
        color: theme.palette.secondary.light,
        font: theme.font.xl,
        marginBottom: "40px",
        "& > span": {
          color: theme.palette.primary[700],
        },
      },
      "& p": {
        font: theme.font.md,
        color: theme.palette.secondary[400],
        marginBottom: "32px",
      },
    },
    "& > .image": {
      width: "100%",
      maxWidth: "680px",
      minWidth: "480px",
      height: "800px",
      "& > img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "left center",
        borderRadius: "12px",
      },
    },
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      "& > .image": {
        display: "none",
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > div": {
      "& > .container": {
        maxWidth: "400px",
        "& h2": {
          font: theme.font.lg,
        },
        "& p": {
          font: theme.font.xs,
        },
      },
    },
  },
}));

const TopBooksContainer = styled(Box)(({ theme }) => ({
  padding: "120px 0",
  "& > .header": {
    maxWidth: "1400px",
    margin: "0 auto 80px auto",
    padding: "0px 20px",
    "& > h2": {
      color: theme.palette.secondary.main,
      font: theme.font.xl,
      maxWidth: "1040px",
      "& > span": {
        font: "inherit",
        color: theme.palette.primary[700],
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .header > h2": {
      font: theme.font.lg,
      maxWidth: "400px",
    },
  },
}));

const QuestionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  margin: "0 auto",
  padding: "120px 20px",
  maxWidth: "1400px",
  "& > .question-img > img": {
    display: "block",
    minWidth: "300px",
    maxWidth: "100%",
  },
  "& > .container": {
    maxWidth: "678px",
    "& > h2": {
      font: theme.font.xl,
      color: theme.palette.secondary.A200,
      marginBottom: "40px",
    },
    "& > p": {
      font: theme.font.md,
      color: theme.palette.secondary[800],
      "& > a": {
        color: theme.palette.primary[700],
        textDecoration: "none",
        fontWeight: 600,
      },
    },
    "& span": {
      font: "inherit",
      color: theme.palette.primary[700],
    },
  },
  [theme.breakpoints.down("md")]: {
    "& > .question-img": {
      display: "none",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& > .container": {
      "& > h2": {
        font: theme.font.lg,
      },
      "& > p": {
        font: theme.font.xs,
      },
      "& span": {
        font: "inherit",
      },
    },
  },
}));

const cards = [
  {
    title: "Pequeno principe",
    author: "Antoine de Saint-Exupéry",
    price: 12.58,
    rating: 3.2,
    ratingQuantity: 832,
    image:
      "https://m.media-amazon.com/images/I/41GrIdsiEIL._SY344_BO1,204,203,200_QL70_ML2_.jpg",
  },
  {
    title: "FRANKENSTEIN",
    author: " MARY SHELLY",
    price: null,
    rating: 5,
    ratingQuantity: 742,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/Screen-Shot-2020-05-18-at-3.39.35-PM-220x300.png",
  },
  {
    title: "CEM ANOS DE SOLIDÃO",
    author: "GABRIEL GARCÍA MÁRQUEZ",
    price: 40.0,
    rating: 2.8,
    ratingQuantity: 22,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/cem-anos-201x300.jpeg",
  },
  {
    title: "CRIME E CASTIGO",
    author: "FIÓDOR DOSTOYEVSKI",
    price: 23.0,
    rating: 3.0,
    ratingQuantity: 900,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/crime-e-castigo-197x300.jpg",
  },
  {
    title: "ORGULHO E PRECONCEITO",
    author: "JANE AUSTEN",
    price: 56.32,
    rating: 3.8,
    ratingQuantity: 1001,
    image: "https://bookmundo.pt/wp-content/uploads/2020/05/orgulho.jpeg",
  },
  {
    title: "O SENHOR DOS ANÉIS",
    author: "J.R.R. TOLKIEN",
    price: 120.4,
    rating: 5,
    ratingQuantity: 2032,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/o-senhor-214x300.jpg",
  },
  {
    title: "A ILÍADA",
    author: "O SENHOR DOS ANÉIS",
    price: 20.4,
    rating: 5,
    ratingQuantity: 232,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/Screen-Shot-2020-05-18-at-3.36.59-PM-213x300.png",
  },
  {
    title: "DOM QUIXOTE DE LA MANCHA",
    author: "MIGUEL DE CERVANTES",
    price: 55.4,
    rating: 5,
    ratingQuantity: 532,
    image:
      "https://bookmundo.pt/wp-content/uploads/2020/05/dom-quixote-211x300.jpg",
  },
  {
    title: "O GRANDE GATSBY",
    author: "F. SCOTT FITZGERALD",
    price: 80.4,
    rating: 5,
    ratingQuantity: 202,
    image: "https://bookmundo.pt/wp-content/uploads/2020/05/gatsby-195x300.jpg",
  },
  {
    title: "1994",
    author: "GEORGE ORWELL",
    price: 80.4,
    rating: 5,
    ratingQuantity: 898,
    image: "https://bookmundo.pt/wp-content/uploads/2020/05/1984-190x300.png",
  },
];

export default function Home() {
  const theme = useTheme();

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  return (
    <>
      <IntroductionContainer>
        <Box
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            opacity: 0.5,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <Box className="title">
          <Typography component="h1">
            Conheça um <Typography component="span">mundo novo</Typography> em
            cada livro!
          </Typography>
          <Typography>
            Publique seus <Typography component="span">próprios</Typography>{" "}
            livros!
          </Typography>
        </Box>
        <FormProvider {...methods}>
          <Input
            name="search"
            placeholder="Buscar..."
            icon={{
              right: <Search style={{ color: theme.palette.primary[700] }} />,
            }}
            sx={{
              maxWidth: "680px",
            }}
          />
        </FormProvider>
      </IntroductionContainer>

      <TopBooksContainer>
        <Box className="header">
          <Typography variant="h2">
            Explore os <span>tops 10</span> livros melhores avaliados na
            plataforma.
          </Typography>
        </Box>
        <Carousel
          data={cards}
          renderItem={(item) => <BookCard size="lg" {...item} />}
        />
      </TopBooksContainer>

      <CallToActionContainer>
        <Box>
          <Box className="container">
            <Typography component="h2">
              Ainda não conhece a nossa <span>Comunidade?</span>
            </Typography>
            <Typography>
              Somos uma gigante comunidade de leitores cheios de vontade de
              conhecer um novo mundo em cada livro que lêmos, publicados por
              autores repletos de criatividade, vem fazer parte desse universo!
            </Typography>
            <Button variant="outlined">Cadastre-se já</Button>
          </Box>
          <Box className="image">
            <img src={bookcase} alt="Uma estante de livros." />
          </Box>
        </Box>
      </CallToActionContainer>

      <QuestionsContainer>
        <Box className="question-img">
          <img src={help} alt="Ícone de dúvidas." />
        </Box>
        <Box className="container">
          <Typography component="h2">
            Você possui alguma <Typography component="span">dúvida?</Typography>
          </Typography>
          <Typography>
            Buscamos sanar toda e qualquer questão que você tiver, nossos
            profissionáis estarão sempre a disposição para solucionar o seu
            problema. Mas antes de nos contatar dê uma olhada nas{" "}
            <Link to="questions">dúvidas frequentes</Link> dos nossos usuários.
          </Typography>
        </Box>
      </QuestionsContainer>
    </>
  );
}
