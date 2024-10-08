import { Box, Button, Typography, useTheme } from "@mui/material";
import Input from "../../components/Input";
import { FormProvider, useForm } from "react-hook-form";
import { Search } from "@mui/icons-material";
import bookcase from "../../assets/IMG/bookcase.jpg";
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
import introducitionBg from "../../assets/IMG/introduction-bg.jpg";
import imageHashs from "../../assets/IMG/imageHashs";
import ImageBlur from "../../components/ImageBlur";

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { getBooks } = useBook();
  const { data: books } = useQuery(
    "getBooks",
    () => getBooks({ page: 1, limit: 10 }),
    { retry: false, refetchOnWindowFocus: false }
  );

  const methods = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleSubmit = methods.handleSubmit(({ search }) => {
    navigate(`/explore`, { replace: true, state: search });
  });

  return (
    <>
      <IntroductionContainer>
        <ImageBlur src={introducitionBg} hash={imageHashs.introduction} />
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
              inputProps={{ maxLength: 255 }}
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

      <TopBooksContainer>
        <Box className="header">
          <Typography variant="h2">
            Explore os <span>tops 10</span> livros melhores avaliados na
            plataforma.
          </Typography>
        </Box>
        {!!books?.items?.length ? (
          <Carousel
            data={books.items}
            timer
            renderItem={(book) => (
              <BookCard
                author={book.user?.name}
                rating={book.rating}
                price={book.price}
                ratingQuantity={book.total_users_rating}
                title={book.name}
                image={book.photo_url}
                key={book.id}
                onClick={() => navigate(`/explore/${book.id}`)}
                size="lg"
                showWishe={false}
              />
            )}
          />
        ) : (
          <Typography
            component="p"
            sx={{
              color: theme.palette.secondary[800],
              font: theme.font.md,
              textAlign: "center",
            }}
          >
            Nenhum livro encontrado.
          </Typography>
        )}
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
          <Box className="image" position={"relative"}>
            <ImageBlur src={bookcase} hash={imageHashs.bookcase} />
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
