export const resetPassword = {
  title: "Vamos trocar sua senha!",
  description:
    "Por segurança, sua senha precisa ter ao menos 1 letra maiúscula, 1 minúscula, 1 número, 1 caractere especial e no mínimo 8 caracteres.",
  passwordLabel: "Senha",
  passwordPlaceholder: "Digite uma senha nova",
  confirmPasswordLabel: "Confirmar senha",
  confirmPasswordPlaceholder: "Confirmar senha nova",
  passwordUnmatch: "As senhas digitadas não são iguais",
  changePassword: "Trocar senha",
  warning: {
    invalidPassword: {
      title: "Não foi possível trocar sua senha",
      description:
        "A nova senha precisa ter ao menos:\n\u2022 1 letra maiúscula;\n\u2022 1 letra minúscula;\n\u2022 1 número;\n\u2022 1 caractere especial;\n\u2022 No mínimo 8 caracteres.",
      onCancel: "Corrigir",
    },
    badRequest: {
      title: "Código expirado",
      description:
        "O código digitado expirou.\nPor favor solicite um novo código.",
      onCancel: "Solicitar novo código",
    },
  },
  success: {
    title: "Senha trocada com sucesso!",
    description: "Agora basta acessar sua conta!",
    onSubmitText: "Ir para o início",
  },
};
