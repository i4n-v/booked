import { Divider, Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { LightLogo, Instagram, Facebook, Youtube } from "../../../assets/SVG";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export default function Footer() {
  const theme = useTheme();

  const FooterOptions = styled(Link)({
    font: theme.font.md,
    color: theme.palette.secondary[600],
    textDecoration: "none",
    display: "block",
    transition: "0.3s",
    "&:hover": {
      color: theme.palette.primary[700],
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.secondary.light,
        padding: "60px 20px",
      }}
    >
      <Grid container maxWidth="1400px" width="100%" mx="auto" spacing={4}>
        <Grid
          item
          md={4}
          xs={12}
          rowGap={"2rem"}
          display={"flex"}
          flexDirection={"column"}
        >
          <LightLogo />
          <Typography
            component={"p"}
            paddingRight={"9rem"}
            color={theme.palette.secondary[600]}
          >
            Booked, um universo repleto de mundos novos em cada livro.
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"left"}
          rowGap={"2rem"}
        >
          <Typography component={"h1"} sx={{ font: theme.font.lg }}>
            Contato
          </Typography>
          <Box color={theme.palette.secondary[600]}>
            <Typography>+55 81 99999-999</Typography>
            <Typography>contato@email.com</Typography>
          </Box>
          <Divider color={theme.palette.secondary["A200"]} />
          <Box color={theme.palette.secondary[600]}>
            <Typography>Rua Madona, 42 - Bota Fogo</Typography>
            <Typography>Pernambuco - PE</Typography>
          </Box>
          <Divider color={theme.palette.secondary["A200"]} />
          <Box
            sx={{
              color: theme.palette.primary.main,
              display: "flex",
              justifyContent: "start",
              columnGap: "2rem",
            }}
          >
            <Link to="#">
              <Instagram />
            </Link>
            <Link to="#">
              <Facebook />
            </Link>
            <Link to="#">
              <Youtube />
            </Link>
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"left"}
          rowGap={"2rem"}
        >
          <Typography component={"h1"} sx={{ font: theme.font.lg }}>
            Outros
          </Typography>
          <Box display="flex" flexDirection="column" gap="6px">
            <FooterOptions to="explore">Explorar</FooterOptions>
            <FooterOptions to="questions">Duvidas</FooterOptions>
            <FooterOptions to="terms">Termos e condições</FooterOptions>
          </Box>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          container
          alignItems={"end"}
          color={theme.palette.secondary[800]}
        >
          Booked © alguns direitos reservados.
        </Grid>
      </Grid>
    </Box>
  );
}
