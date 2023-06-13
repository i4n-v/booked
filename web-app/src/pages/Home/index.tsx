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
import { useQuery } from "react-query";
import useBook from "../../services/useBook";


export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getBooks } = useBook()
  const { data: books } = useQuery('getBooks', () => getBooks({ page: 1, limit: 10 }), { retry: false.valueOf, refetchOnWindowFocus: false })

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSubmit = methods.handleSubmit(({ search }) => {
    navigate(`/explore`, { replace: true, state: search })
  })

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
          <form onSubmit={handleSubmit}>
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
          </form>
        </FormProvider>
      </IntroductionContainer>

      {books ? <TopBooksContainer>
        <Box className="header">
          <Typography variant="h2">
            Explore os <span>tops 10</span> livros melhores avaliados na
            plataforma.
          </Typography>
        </Box>
        <Carousel
          data={books.items}
          timer
          renderItem={(book) => <BookCard
            author={book.user?.name}
            rating={1}
            price={book.price}
            ratingQuantity={1}
            title={book.name}
            image={book.photo_url}
            key={book.id}
            size="lg"
          />}
        />
      </TopBooksContainer> : null}

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
