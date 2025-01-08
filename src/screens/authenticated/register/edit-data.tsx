import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { Image } from "@/assets/images";
import { Button, Flex, Template, Text, TextInput } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { Service } from "@/services";
import { KeyOfCompanyProps } from "@/services/data/financial";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.register;

const mock_template = [
  [
    {
      label: Texts.commons.completeName,
      value: "",
      flex: 1,
      type: "text",
      mapper: "completeName",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.birthDate,
      value: "",
      flex: 1,
      type: "date",
      mapper: "birthDate",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.email,
      value: "",
      flex: 1,
      type: "text",
      mapper: "email",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.cpf,
      value: "123.456.789-00",
      flex: 0.5,
      type: "text",
      mapper: "cpf",
      readOnly: true,
    },
    {
      label: Texts.commons.verificationDocumentType,
      value: "RG",
      flex: 0.5,
      type: "text",
      mapper: "verificationDocumentType",
      readOnly: true,
    },
  ],
  [
    {
      label: Texts.commons.cep,
      value: "00000-000",
      flex: 1,
      type: "text",
      mapper: "cep",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.street,
      value: "Rua Exemplo",
      flex: 0.8,
      type: "text",
      mapper: "street",
      readOnly: false,
    },
    {
      label: Texts.commons.number,
      value: "123",
      flex: 0.2,
      type: "text",
      mapper: "number",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.neighborhood,
      value: "Centro",
      flex: 1,
      type: "text",
      mapper: "neighborhood",
      readOnly: false,
    },
  ],
  [
    {
      label: Texts.commons.motherName,
      value: "Maria da Silva",
      flex: 1,
      type: "text",
      mapper: "motherName",
      readOnly: false,
    },
  ],
  // [
  //   {
  //     label: "Status Civil",
  //     value: "Solteiro#Casado#Divorciado#Víuvo",
  //     flex: 1,
  //     type: "select",
  //   },
  // ],
  // [
  //   {
  //     label: "Politicamente exposto (a)",
  //     value: "Sim#Não",
  //     flex: 1,
  //     key: "politicamente_exposto",
  //     type: "select",
  //   },
  // ],
  // [
  //   {
  //     label: "Desde quando",
  //     value: "00/00/0000",
  //     conditional: "politicamente_exposto",
  //     flex: 1,
  //     type: "date",
  //   },
  // ],
] as {
  label: string;
  value: string;
  flex: number;
  type: string;
  mapper: KeyOfCompanyProps;
  readOnly: boolean;
}[][];

const now = new Date();
const currentDate = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  0,
  0,
  0,
  0
);
currentDate.setFullYear(currentDate.getFullYear() - 18);

export function EditData({
  navigation,
  route,
}: RouteStackParams<"RegisterEditData">) {
  const company = route.params.company;
  const [data, setData] = useState(mock_template);
  const [loading, setLoading] = useState(true);

  async function getCompany() {
    const response = company || (await Service.Financial.getCompany());
    mock_template.forEach((row) => {
      row.forEach((field) => {
        if (response?.[field.mapper]) {
          field.value = response[field.mapper] ?? "";
        }
      });
    });

    setData(mock_template);
  }

  useEffect(() => {
    setLoading(true);
    getCompany().finally(() => setLoading(false));
  }, []);

  return (
    <Template.Base
      style={{ backgroundColor: theme.color.gray[900], paddingHorizontal: 0 }}
      isLoading={loading}
    >
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <Flex
          style={{
            justifyContent: "space-between",
            marginBottom: theme.spacing.xxs,
            paddingHorizontal: theme.spacing.xxs,
          }}
        >
          <Text.Base>{Texts.editData.title}</Text.Base>
          <Button.Back onPress={() => navigation.goBack()}>
            <Image.X />
          </Button.Back>
        </Flex>
        <ScrollView
          contentContainerStyle={{
            gap: theme.spacing.xxs,
            paddingBottom: theme.spacing.xxs,
            paddingHorizontal: theme.spacing.xxs,
          }}
        >
          <View style={{ gap: theme.spacing.xxxs }}>
            {data.map((row, index) => {
              const isSingleField = row.length === 1;

              if (isSingleField) {
                if (row[0].type === "date") {
                  return (
                    <TextInput.DatePicker
                      label={row[0].label}
                      value={new Date(row[0].value) as Date}
                      key={index}
                      maximumDate={currentDate}
                    />
                  );
                }
                return (
                  <TextInput.Base
                    label={row[0].label}
                    key={index}
                    value={row[0].value as string}
                    disabled={row[0].readOnly}
                  />
                );
              }

              return (
                <Flex
                  style={{
                    width: theme.size.full,
                    gap: theme.spacing.xxxs,
                    justifyContent: "space-between",
                  }}
                  key={index}
                >
                  {row.map((field, index) => (
                    <View style={{ flex: field.flex }} key={index}>
                      <TextInput.Base
                        label={field.label}
                        value={field.value as string}
                        disabled={field.readOnly}
                      />
                    </View>
                  ))}
                </Flex>
              );
            })}
          </View>
        </ScrollView>
        <Button.Submit
          title={Texts.editData.buttons.save}
          onPress={() => console.log("d")}
        />
      </View>
    </Template.Base>
  );
}
