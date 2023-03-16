
import { Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "../../components/Card";
import Menu from "../../components/Menu";
import Title from "../../components/Title/Title";

export default function Home() {

  return <>
    <Box>
      <Menu></Menu>
      <Box sx={{ background: (theme)=> theme.palette.secondary.light }}>
            <Box position="relative" display="flex" justifyContent="left" alignItems="center" height="95vh" overflow="hidden">
                <img src="img.png" alt="Imagem" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', minWidth: '100%', minHeight: '100%', objectFit: 'cover' }} />
                <Typography variant="h1" sx={{ position: 'absolute', color: "white", padding: 8 }}>
                    Conheça um <b style={{ color: "#9b51e0" }}>mundo<br />novo</b> em cada livro!
                </Typography>
                <Typography variant="h4" sx={{ position: 'absolute', color: "white", padding: 8, bottom: 185 }}>
                    Publique seus <b style={{ color: "#9b51e0" }}>próprios</b> livros!
                </Typography>
            </Box>

            <Box sx={{ height: "95vh", display: 'flex', flexDirection: 'column', pl: 8, py:5 }}>
                <Typography variant="h2" sx={{ color: "#121212", textAlign: 'left', margin: '20px 0 50px 0' }}>
                    Explore os <span style={{ color: "#9b51e0" }}>tops 10</span> livros melhores <br></br>avaliados na plataforma.
                </Typography>
                <Card></Card>
            </Box>

            <Box position="relative" sx={{ height: "85vh", display: 'flex'}}>
                <Box sx={{ height: "80%", width: '100%', background: '#121212', display: 'flex', justifyContent: 'center', alignItems: 'center', }} >
                    <Box sx={{ padding: 8 }}>
                        <Title textoConteudo="Ainda não conhece a nossa" tagConteudo="comunidade?" corTexto="white"></Title>
                        <Typography variant="h5" align="left" pb={8} sx={{ width: '80%', color: '#DEDEDE' }}>
                            Somos uma gigante comunidade de leitores cheios de vontade de conhecer um novo mundo em cada livro que lêmos, publicados por autores repletos de criatividade, vem fazer parte desse universo!
                        </Typography>
                    </Box>
                    <div ><img src="img-books.svg" alt="" /></div>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', height: "85vh", justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '50%', pl: 28 }}>
                    <img src="help.svg" alt="Imagem" />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Title textoConteudo="Você possui alguma" tagConteudo="dúvida?" corTexto="#121212"></Title>
                    <Typography variant="h5" align="left" pb={8} sx={{ width: '80%', color: '#595959' }}>
                        Buscamos sanar toda e qualquer questão que você tiver, nossos profissionáis estarão sempre a disposição para solucionar o seu problema. Mas antes de nos contatar dê uma olhada nas <b style={{ color: "#9b51e0" }} >dúvidas frequentes</b> dos nossos usuários.
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
  </>
}