import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { Image } from "@/assets/images";
import { Button, Template, Text } from "@/components/ui";
import { RouteStackParams } from "@/navigation/routes";
import { Service, ServiceProps } from "@/services";
import { KeyOfCompanyProps } from "@/services/data/financial";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

interface DisplayUserInfoProps {
  fields: { label: string; value: string }[];
}

const Texts = Utils.Constants.Text.authenticated.register;
function DisplayUserInfo(props: DisplayUserInfoProps) {
  return (
    <ScrollView
      style={{ maxHeight: 300 }}
      contentContainerStyle={{ gap: theme.spacing.nano }}
    >
      {props.fields.map((field, index) => {
        let value = field.value;

        if (field.label === Texts.commons.birthDate) {
          value = new Date(value).toLocaleDateString();
        }

        return (
          <View key={index}>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxs,
                fontFamily: theme.font.family.medium,
                fontWeight: theme.font.weight.medium,
                color: theme.color.white["080"],
              }}
            >
              {field.label}
            </Text.Base>
            <Text.Base
              style={{
                fontFamily: theme.font.family.medium,
                fontWeight: theme.font.weight.medium,
              }}
            >
              {value}
            </Text.Base>
          </View>
        );
      })}
    </ScrollView>
  );
}

export function Register({ navigation }: RouteStackParams<"RegisterHome">) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DisplayUserInfoProps["fields"]>([]);
  const company = useRef<ServiceProps["Financial"]["Company"]["Get"]>();

  async function getCompany() {
    const response = await Service.Financial.getCompany();
    company.current = response;

    const currentData = Object.keys(Texts.commons).reduce(
      (acc, key) => {
        const parsedKey = key as KeyOfCompanyProps;
        let value: string | Date = response[parsedKey] || "";
        if (key === "birthDate" && value) {
          value = new Date(value);
        }
        acc.push({
          label: Texts.commons[parsedKey],
          value: value.toString(),
        });

        return acc;
      },
      [] as DisplayUserInfoProps["fields"]
    );

    setData(currentData);
  }

  useEffect(() => {
    setLoading(true);
    getCompany().finally(() => setLoading(false));
  }, []);

  return (
    <Template.Base isLoading={loading}>
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View style={{ gap: theme.spacing.xs }}>
          <Image.CaktoShareScreen
            svg={{ style: { marginTop: theme.spacing.xs } }}
          />
          <View style={{ gap: theme.spacing.nano }}>
            <Text.Base style={{ fontSize: theme.font.size.lg, lineHeight: 24 }}>
              {Texts.home.title}
            </Text.Base>
            <Text.Base
              style={{
                lineHeight: 24,
                fontFamily: theme.font.family.medium,
                fontWeight: theme.font.weight.medium,
              }}
            >
              {Texts.home.description}
            </Text.Base>
          </View>
          <DisplayUserInfo fields={data} />
        </View>
        <View style={{ gap: theme.spacing.xxxs }}>
          <Button.Base
            disabled={!company.current}
            variant="unfilled"
            title={Texts.home.buttons.edit}
            onPress={() => {
              navigation.navigate("RegisterEditData", {
                company: company.current!,
              });
            }}
          />
          <Button.Base
            onPress={() => navigation.navigate("RegisterFaceValidationHome")}
            textProps={{ color: theme.color.secondary.normal }}
            variant="filled"
            title={Texts.home.buttons.continue}
          />
        </View>
      </View>
    </Template.Base>
  );
}
