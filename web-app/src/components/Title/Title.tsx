import { Typography } from "@material-ui/core"

interface Props {
  tagConteudo: string;
  textoConteudo: string;
  corTexto: string;
}

export default function Title(props: Props) {
  const { tagConteudo, textoConteudo, corTexto} = props;

  return (
    <Typography variant="h2" style={{ color: corTexto }}>
      {textoConteudo} <b style={{ color: "#9b51e0" }}>{tagConteudo}</b>{" "}
    </Typography>
  );
}




