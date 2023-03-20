import { Facebook, Instagram, YouTube } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LightLogo } from "../../../assets/SVG";

export default function Footer() {
  return (
    <Grid
      container
      xs={12}
      sx={{
        backgroundColor: (t) => t.palette.secondary.dark,
        height: "29.625rem",
        color: (t) => t.palette.secondary.light,
        padding: "5%",
      }}
    >
      <Grid xs={4} rowGap={"2rem"} display={"flex"} flexDirection={"column"}>
        <LightLogo />
        <Typography component={"p"} paddingRight={'9rem'} color={(t) => t.palette.secondary[600]}>
          Booked, um universo repleto de mundos novos em cada livro.
        </Typography>
      </Grid>
      <Grid
        xs={4}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"left"}
        rowGap={"2rem"}
      >
        <Typography component={"h1"} sx={{ font: (t) => t.font.lg }}>
          Contato
        </Typography>
        <Box color={(t) => t.palette.secondary[600]}>
          <Typography>+55 81 99999-999</Typography>
          <Typography>contato@email.com</Typography>
        </Box>
        <Box color={(t) => t.palette.secondary[600]}>
          <Typography>Rua Madona, 42 - Bota Fogo</Typography>
          <Typography>Pernambuco - PE</Typography>
        </Box>
        <Box
          sx={{
            color: (t) => t.palette.primary.main,
            display: "flex",
            justifyContent: "start",
            columnGap: "2rem",
          }}
        >
          <Instagram sx={{ font: (t) => t.font.lg }} />
          <Facebook sx={{ font: (t) => t.font.lg }} />
          <YouTube sx={{ font: (t) => t.font.lg }} />
        </Box>
      </Grid>
      <Grid
        xs={4}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"left"}
        rowGap={"2rem"}
      >
        <Typography component={"h1"} sx={{ font: (t) => t.font.lg }}>
          Outros
        </Typography>
        <Box color={(t) => t.palette.secondary[600]}>
          <Typography>Explorar</Typography>
          <Typography>Duvidas</Typography>
          <Typography>Termos e condições</Typography>
        </Box>
      </Grid>
      <Grid xs={12} container alignItems={"end"} color={(t) => t.palette.secondary[800]}>
        Booked © alguns direitos reservados.
      </Grid>
    </Grid>
  );
}
