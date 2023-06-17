const Message = {
  NAME_REQUIRED: "Nome é requerido.",
  USERNAME_REQUIRED: "Usuário é requerido.",
  NAME_MIN_LENGTH: "Nome deve conter ao menos 2 caracteres.",
  USERNAME_MIN_LENGTH: "Usuário deve conter ao menos 2 caracteres.",
  EMAIL_REQUIRED: "Email é requerido.",
  EMAIL_INVALID: "Insira um email valido.",
  PASSWORD_REQUIRED: "Senha é requerida.",
  PASSWORD_SHAPE: "Senha deve conter no mínimo 8 caracteres, contendo números e letras.",
  PASSWORD_CONFIRMATION_REQUIRED: "Confirmação de senha é requerida.",
  PASSWORD_CONFIRMATION_MATCH: "As senhas não coincidem.",
  DATE_REQUIRED: "Data é requerida.",
  DATE_INVALID: "Data é invalida.",
  DATE_FUTURE: "Data não pode ser maior que o dia atual.",
  SUCCESS_LOGIN: "Login realizado com sucesso.",
  SUCESS_UPDATE: "Atualização feita com sucesso.",
  DELETE_QUESTION: (description : string) => `Deseja excluir o ${description} ?`
}

export default Message;
