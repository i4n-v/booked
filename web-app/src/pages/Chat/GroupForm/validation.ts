import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Nome do grupo deve ser informado."),
});

export default schema;
