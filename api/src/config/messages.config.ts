const messages = {
  create: (entity = 'registro') => `${entity} cadastrado com sucesso.`,
  update: (entity = 'registro') => `${entity} atualizado com sucesso.`,
  delete: (entity = 'registro') => `${entity} deletado com sucesso.`,
  error: () => 'houve uma falha na operação solicitada.',
  unknown: (entity = 'registro') => `${entity} não encontrado.`,
};

export default messages;