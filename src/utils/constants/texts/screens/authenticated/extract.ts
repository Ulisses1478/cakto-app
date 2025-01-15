export const extract = {
  home: {
    title: "Saldo em conta",
    filter: {
      options: {
        receive: "Receber",
        pay: "Pagar",
        automaticDebit: "Débito\nautomático",
        transfer: "Transferir",
      },
      range: {
        title: "Período",
        options: {
          total: "Total",
          sevenDays: "7 D",
          fifteenDays: "15 D",
          thirtyDays: "30 D",
          other: "Outro",
        },
      },
      result: {
        singleDate: "De {{from}}",
        range: "De {{from}} até {{to}}",
        balanceOfTheDay: "Saldo do dia ##{{balance}}##",
        today: "Hoje",
        yesterday: "Ontem",
      },
    },
  },
};
