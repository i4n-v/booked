import { Box, Button, Typography, useTheme } from "@mui/material";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "@mui/icons-material";
import bookcase from "../../assets/IMG/bookcase.png";
import help from "../../assets/SVG/help.svg";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "../../components";
import { BookCard } from "../../components/Cards";
import {
  CallToActionContainer,
  IntroductionContainer,
  QuestionsContainer,
  TopBooksContainer,
} from "./styles";

export const cards = [
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
  const navigate = useNavigate();

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
          timer
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
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Cadastre-se já
            </Button>
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
