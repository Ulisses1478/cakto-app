export const pix = {
  randomKey: "Chave aleatória",
  home: {
    title: "Área Pix",
    description:
      "Envie e receba pagamentos a qualquer hora e dia da semana, sem pagar nada por isso.",
    options: {
      send: "Enviar",
      receive: "Receber",
      copyAndPaste: "Copia e Cola",
      readQrCode: "Ler QR Code",
    },
    myKeys: "Minhas Chaves PIX",
  },
  receive: {
    title: "Receber Pix",
    customValue: "Personalizar valor",
    buttons: {
      shareQrCode: "Compartilhar QR code",
      shareCopyAndPaste: "Compartilhar Pix Copia e Cola",
    },
    confirmation: {
      title: "Revisão",
      descriptionWithValue: "Valor a receber",
      descriptionWithoutValue:
        "Caso você não informe o valor, ele será\ndefinido por quem for pagar o QR Code.",
      inputMessageLabel: "Mensagem",
      inputMessagePlaceholder: "Escreva aqui",
      optional: "Opcional",
      buttons: {
        edit: "Editar",
        create: "Criar QR Code {value}",
        withValue: "de {value}",
        withoutValue: "sem valor",
      },
    },
  },
  customValue: {
    title: "Criar QR Code",
    description: "Valor a receber (opcional)",
    information:
      "Caso você não informe o valor, ele será\ndefinido por quem for pagar o QR Code.",
    buttons: {
      continue: "Continuar",
    },
  },
  send: {
    home: {
      title: "Qual o valor você quer enviar?",
      description: "Seu saldo atual é: ",
      higherValue:
        "O valor digitado ultrapassa seu saldo\ndisponível no momento.",
      buttons: {
        continue: "Continuar",
      },
      warning: {
        title: "Oops!",
        description: "O valor deve ser maior do que 0!",
        onSubmitText: "Digitar outro valor",
      },
    },
    informPix: {
      title: "Para quem você quer enviar\n{value}?",
      description:
        "Escolha um dos contatos da sua lista, ou envie para um novo contato digitando a chave Pix.",
      invalidPix: "Por favor, digite uma chave Pix válida.",
      buttons: {
        sendTo: "Enviar para este {value}",
        continue: "Continuar",
      },
    },
    selectBankAccount: {
      title: "Escolha para qual conta você quer enviar",
      description: "Enviando",
    },
    confirmation: {
      title: "Enviar",
      edit: "Alterar",
      to: "Para",
      message: "Escrever uma mensagem",
      cpf: "CPF",
      bank: "Instituição",
      agency: "Agência",
      account: "Conta Corrente",
      buttons: {
        transfer: "Transferir {value}",
      },
      modals: {
        editValue: {
          title: "Qual o valor que você quer enviar?",
          description: "Seu saldo atual é: ",
          warning: {
            text: "Por favor, digite um valor maior que R$ 0,00.",
          },
          buttons: {
            updateValue: "Atualizar valor",
          },
        },
        editMessage: {
          title: "Escreva uma mensagem",
          description: "A mensagem irá aparecer para ",
          subDescription: " no comprovante de transferência",
          inputPlaceholder: "Digite sua mensagem aqui...",
          buttons: {
            saveMessage: "Salvar mensagem",
          },
        },
      },
    },
    typePassword: {
      title: "Digite sua senha",
      description: "Essa é a senha de 4 digitos do seu cartão Cakto.",
      warning: {
        title: "Senha incorreta",
        description: "Você possuí mais",
        subDescription: "{{value}} tentativas",
      },
      error: {
        title: "Senha bloqueada.",
        description:
          "Devido a {{value}} tentativas incorretas de digitação,\nsua senha ficará bloqueada por {{remaining_time}}",
      },
    },
  },
};
