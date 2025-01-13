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
    copyAndPaste: {
      title: "Insira o código Pix Copia e Cola",
      inputPlaceholder: "Cole o código aqui",
      buttons: {
        continue: "Continuar",
      },
    },
    qrcode: {
      title:
        "Aponte a câmera para o QR Code e aguarde\na leitura para efetuar o seu pagamento.",
      requestPermissionTitle:
        "Precisamos da sua permissão para abrir a câmera e ler o QR Code",
      buttons: {
        grantPermission: "Dar permissão",
      },
      warning: {
        title: "QR Code não encontrado",
        description: "Centralize a imagem do QR Code\nna tela de leitura.",
        onSubmitText: "Tentar novamente",
        onCancelText: "Usar Pix Copia e Cola",
      },
      invalid: {
        title: "Esse QR Code não é de um Pix",
        description:
          "Não é possível fazer o pagamento.\nPeça um QR Code de Pix pra quem\nvocê quer pagar ou refaça sua compra.",
        onSubmitText: "Entendi",
      },
    },
  },
  keys: {
    home: {
      title: "Minhas Chaves Pix",
      description: "Gerencie suas chaves para receber transferência pelo Pix.",
      subtitle: "{{current}} de {{total}} chaves",
      waitingForPortability: "Aguardando portabilidade",
      buttons: {
        addKey: "Adicionar Chave Pix",
      },
    },
    confirmationButtons: {
      backToHome: "Voltar ao início",
      backToPixArea: "Voltar à área Pix",
    },

    create: {
      title: "Nova Chave Pix",
      description: "Qual tipo de chave você deseja criar?",
      portability: {
        title: "Portabilidade de chave PIX solicitada!",
        description:
          "Agora você precisa ##aprovar a portabilidade## da chave {{field}} {{value}} em ##{{bank_name}} até dia {{date}}!##",
        modal: {
          title:
            "Este {{type}} já está registrado como chave Pix em outra conta.",
          description:
            "Você pode optar por utilizar a Cakto, mas a chave Pix no outro banco deixará de\nfuncionar. Qual é a sua decisão?",
          buttons: {
            yes: "Quero usar meu {{type}} na Cakto",
            no: "Deixar {{type}} no outro banco",
          },
        },
      },
      cpf: {
        home: {
          title: "Registrar CPF",
          description:
            "Contatos poderão fazer transferência pelo Pix usando seu CPF",
          label: "Seu CPF",
          footerDescription:
            "Quem utiliza o Pix pode perceber que você possui uma chave registrada por meio do telefone ou e-mail, mas não terá acesso às suas informações pessoais. Ao fazer um Pix para você, a pessoa poderá visualizar seu nome completo e alguns números do seu CPF.",
          buttons: {
            register: "Registrar meu CPF como chave PIX",
          },
        },

        confirmation: {
          title: "CPF registrado com sucesso\ncomo chave Pix!",
        },
      },
    },
    delete: {
      title: "Excluir chave Pix",
      description: "Você tem certeza que deseja excluir a chave Pix {{value}}?",
      buttons: {
        yes: "Sim, desejo excluir",
        no: "Não desejo excluir",
      },
    },
    keyTypes: {
      key: "Chave {{value}}",
      evp: "Aleatória",
      national_registration: "CPF",
      phone_number: "Celular",
      email: "E-mail",
    },
    options: {
      shareKey: "Compartilhar Chave",
      createQRCode: "Criar QR Code",
      delete: "Excluir Chave",
    },
  },
};
