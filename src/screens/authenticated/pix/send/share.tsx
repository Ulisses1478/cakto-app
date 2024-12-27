import { ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Image } from "@/assets/images";
import { Button, Flex, Text } from "@/components/ui";
import { theme } from "@/styles/theme";

const base_data = [
  { title: "Valor", value: "R$ 100,00" },
  { title: "Tipo de transfêrencia", value: "Pix" },
  {
    title: "Mensagem",
    value:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    wrap: true,
  },
];

const mock_data = {
  Destino: [
    { title: "Nome", value: "Jhon Doe" },
    { title: "CPF", value: "***.456.789-**" },
    { title: "Instituição", value: "Cakto Pay" },
    { title: "Agência", value: "1" },
    { title: "Conta", value: "125641-6" },
    { title: "Tipo de conta", value: "Conta Corrente" },
  ],
  Origem: [
    { title: "Nome", value: "Antony Jones" },
    { title: "CPF", value: "***.456.789-**" },
    { title: "Instituição", value: "Cakto Pay" },
    { title: "Agência", value: "1" },
    { title: "Conta", value: "125641-6" },
    { title: "Tipo de conta", value: "Conta Corrente" },
  ],
};

interface ContainerProps {
  data: { title: string; value: string; wrap?: boolean }[];
  marginHorizontal?: number;
}

function Container(props: ContainerProps) {
  const { data, marginHorizontal = 0 } = props;
  const messageProps = {
    fontWeight: theme.font.weight.regular,
    fontFamily: theme.font.family.regular,
    lineHeight: 20,
    fontSize: theme.font.size.xxs,
  };
  return (
    <View
      style={{
        backgroundColor: theme.color.gray["800"],
        borderRadius: theme.borderRadius.base,
        padding: theme.spacing.xxxs,
        gap: theme.spacing.xxs,
        marginHorizontal,
      }}
    >
      {data.map((item, index) => (
        <Flex
          key={index}
          style={{
            flexDirection: item.wrap ? "column" : "row",
            alignItems: item.wrap ? "flex-start" : "center",
            justifyContent: "space-between",
          }}
        >
          <Text.Base
            style={{
              color: theme.color.white["080"],
              fontWeight: theme.font.weight.medium,
              fontFamily: theme.font.family.medium,
            }}
          >
            {item.title}
          </Text.Base>
          <Text.Base style={item.wrap && messageProps}>{item.value}</Text.Base>
        </Flex>
      ))}
    </View>
  );
}

const mock_current_date = new Date();
// format to 00/00/0000 - 00:00:00
const formatted_date = new Date(mock_current_date).toLocaleString("pt-BR", {
  dateStyle: "short",
  timeStyle: "medium",
});

export function Share() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.gray[900] }}>
        <Button.Back
          style={{
            marginLeft: theme.spacing.xxs,
            marginTop: theme.spacing.xxs,
          }}
        >
          <Image.X />
        </Button.Back>
        <ScrollView
          style={{
            flex: 1,
            marginTop: theme.spacing.xxs,
          }}
          contentContainerStyle={{
            gap: theme.spacing.xxs,
          }}
        >
          <Image.CaktoShareScreen
            svg={{
              style: {
                marginLeft: theme.spacing.xxs,
              },
            }}
          />

          <View style={{ marginHorizontal: theme.spacing.xxs }}>
            <Text.Base style={{ fontSize: theme.font.size.md, lineHeight: 25 }}>
              Comprovante de transfêrencia
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                lineHeight: 21,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {formatted_date}
            </Text.Base>
          </View>

          <Container data={base_data} marginHorizontal={theme.spacing.xxs} />

          {Object.entries(mock_data).map(([key, value], index) => (
            <View
              key={index}
              style={{
                gap: theme.spacing.base,
                marginHorizontal: theme.spacing.xxs,
              }}
            >
              <Text.Base>{key}</Text.Base>
              <Container data={value} />
            </View>
          ))}

          <View
            style={{
              backgroundColor: theme.color.gray[800],
              borderTopLeftRadius: theme.borderRadius.sm,
              borderTopRightRadius: theme.borderRadius.sm,
              gap: theme.spacing.xxs,
              padding: theme.spacing.xxs,
            }}
          >
            <Text.Base style={{ lineHeight: 24 }}>Cakto Pay LTDA</Text.Base>
            <Text.Base style={{ lineHeight: 24 }}>
              CNPJ: 52.328.926/0001-04
            </Text.Base>
            <View>
              <Text.Base style={{ lineHeight: 24 }}>ID da Transação</Text.Base>
              <Text.Base
                style={{
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                }}
              >
                DFAS5D1F6AS1DF63SA15DFA
              </Text.Base>
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            padding: theme.spacing.xxs,
            width: theme.size.full,
            borderTopWidth: theme.borderWidth.hairline,
            borderTopColor: theme.color.gray[700],
          }}
        >
          <Button.Base
            leftIcon={<Image.Share />}
            title="Compartilhar comprovante"
            style={{ backgroundColor: theme.color.secondary.normal }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
