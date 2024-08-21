import { createNumberMask } from "../utils/mask";

const fieldsRegex = {
  cpf: [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/],
  rg: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  cep: [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
  phone: ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/],
  cns: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  price: createNumberMask({
    prefix: ["R", "$", " "],
    separator: ",",
    delimiter: ".",
    precision: 2,
  }),
};

const matchRegex = {
  password: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
};

export { fieldsRegex, matchRegex };
