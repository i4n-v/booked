enum Message {
  NAME_REQUIRED = "Nome é requerido.",
  NAME_MIN_LENGTH = "Nome deve conter ao menos 2 caracteres.",
  EMAIL_REQUIRED = "Email é requerido.",
  EMAIL_INVALID = "Insira um email valido.",
  PASSWORD_REQUIRED = "Senha é requerida.",
  PASSWORD_MIN_LENGTH = "Senha deve conter no minimo * caracteres.",
  PASSWORD_CONFIRMATION_REQUIRED = "Confirmação de senha é requerida.",
  PASSWORD_CONFIRMATION_MATCH = "As senhas não coincidem.",
  DATE_REQUIRED = "Data é requerida.",
  DATE_INVALID = "Data é invalida.",
  DATE_FUTURE = "Data não pode ser maior que o dia atual.",
}

export default Message;
