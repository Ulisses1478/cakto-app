import { TouchableOpacity, View } from "react-native";

import { Image } from "@/assets/images";
import { Flex, Text } from "@/components/ui";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const incomming = theme.color.secondary.bright;
const outgoing = theme.color.red.negative;

export interface DetailCardProps {
  id: string;
  operationType: "incomming" | "outgoing";
  title: string;
  description?: string | null;
  value: number;
  outgoingType: string;
}

export function DetailCard(props: DetailCardProps) {
  const { operationType, title, value, description, outgoingType } = props;

  const color = operationType === "incomming" ? incomming : outgoing;
  const operation = operationType === "incomming" ? "+" : "-";
  const DynamicIcon =
    operationType === "incomming" ? Image.Arrow.Up : Image.Arrow.Down;

  return (
    <TouchableOpacity
      style={{
        paddingHorizontal: theme.spacing.xxxs,
        paddingVertical: theme.spacing.base,
        borderRadius: theme.borderRadius.sm,
        backgroundColor: theme.color.white["012"],
        position: "relative",
      }}
    >
      <Flex
        style={{
          justifyContent: "space-between",
        }}
      >
        <Flex style={{ gap: theme.spacing.xxxs }}>
          <View
            style={{
              borderWidth: theme.borderWidth.hairline,
              borderColor: color,
              borderRadius: theme.borderRadius.sm,
              padding: theme.spacing.nano,
            }}
          >
            <DynamicIcon fill={color} />
          </View>
          <View style={{ gap: theme.spacing.nano, justifyContent: "center" }}>
            <Text.Base
              style={{ fontSize: theme.font.size.xxs, letterSpacing: 1 }}
            >
              {title}
            </Text.Base>
            <Text.Base
              style={{ fontSize: theme.font.size.xxs, letterSpacing: 1 }}
            >
              {operation} {Utils.Intl.Number.formatCurrency(value)}
            </Text.Base>
            {description && (
              <Text.Base
                numberOfLines={1}
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                  color: theme.color.white["064"],
                }}
              >
                {description}
              </Text.Base>
            )}
            {outgoingType && (
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxxs,
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                  color: theme.color.white["064"],
                }}
              >
                {outgoingType}
              </Text.Base>
            )}
          </View>
        </Flex>
        <Image.Chevron.RightLarge
          svg={{
            style: { position: "absolute", right: 0 },
          }}
          path={{
            stroke: theme.color.secondary.bright,
          }}
        />
      </Flex>
    </TouchableOpacity>
  );
}

export interface DetailProps {
  date: string;
  data: {
    date: string;
    balance: number;
    operations: DetailCardProps[];
  }[];
}

const t = Utils.Constants.Text.t;
const Texts = Utils.Constants.Text.authenticated.extract.home.filter.result;

const overviewStyleProps = {
  fontSize: 9,
  fontWeight: theme.font.weight.regular,
  fontFamily: theme.font.family.regular,
  letterSpacing: 1,
  color: theme.color.white["064"],
};

export function Details(props: DetailProps) {
  const { date, data } = props;

  let month = new Date(date).toLocaleString("pt-BR", { month: "long" });
  month = month.charAt(0).toUpperCase() + month.slice(1);

  return (
    <View style={{ gap: theme.spacing.xxxs }}>
      <Text.Base>{month}</Text.Base>
      <View>
        {data.map((item, index) => {
          // Sábado, 14 dez, 2024
          const formatedDate = new Date(item.date)
            .toLocaleString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })
            .replace("-feira", "");

          const isToday =
            new Date(item.date).toDateString() === new Date().toDateString();

          const isYesterday =
            new Date(item.date).toDateString() ===
            new Date(
              new Date().setDate(new Date().getDate() - 1)
            ).toDateString();

          const year = new Date(item.date).getFullYear();
          const dateText = isToday
            ? t(Texts.today)
            : isYesterday
              ? t(Texts.yesterday)
              : `${formatedDate} ${year}`;

          return (
            <View
              key={index}
              style={{
                gap: theme.spacing.xxxs,
                marginTop: index > 0 ? theme.spacing.xxxs : 0,
              }}
            >
              <Flex style={{ justifyContent: "space-between" }}>
                <Text.Base style={overviewStyleProps}>{dateText}</Text.Base>
                <Text.Highlight
                  text={t(Texts.balanceOfTheDay, {
                    balance: Utils.Intl.Number.formatCurrency(item.balance),
                  })}
                  unhighlightedTextStyle={overviewStyleProps}
                  highlightedTextStyle={{
                    ...overviewStyleProps,
                    color: theme.color.white["100"],
                  }}
                />
              </Flex>

              <View style={{ gap: theme.spacing.xxxs }}>
                {item.operations.map((operation, index) => {
                  return <DetailCard key={index} {...operation} />;
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
