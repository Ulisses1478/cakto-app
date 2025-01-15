import { useEffect, useState } from "react";
import {
  Alert,
  DimensionValue,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "@/assets/images";
import { Avatar, Button, Flex, Template, Text } from "@/components/ui";
import { ContextHook } from "@/contexts";
import { RouteStackParams } from "@/navigation/routes";
import { Service } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

function getProgress(revenue: { current: number; total: number }) {
  if (revenue.current === 0 || revenue.total === 0) return 0;
  return Math.floor((revenue.current / revenue.total) * 100);
}

// TODO: Caso necessário utilizar em outro arquivo, mover para pasta /utils
function handleValue(value: number | string, hide: boolean) {
  if (hide) {
    return "****";
  }
  return value as string;
}

const t = Utils.Constants.Text.t;
const Texts = Utils.Constants.Text.authenticated.home;

export function Home({ navigation }: RouteStackParams<"Home">) {
  const { isReady, auth, handleLogout, hideValue, toggleHideValue } =
    ContextHook.useAuth();

  const [financial, setFinancial] = useState({
    isFetching: false,
    balance: "R$ 0",
    pending: "R$ 0",
  });

  useEffect(() => {
    if (hideValue) return;
    setFinancial((old) => ({ ...old, isFetching: true }));
    Service.Financial.getBalance()
      .then((r) => {
        const balance = Utils.Intl.Number.formatCurrency(r.balance);
        const pending = Utils.Intl.Number.formatCurrency(r.pending);
        setFinancial((old) => ({ ...old, balance, pending }));
      })
      .finally(() => {
        setFinancial((old) => ({ ...old, isFetching: false }));
      });
  }, [hideValue]);

  const totalValue = Utils.Intl.Number.formatCurrency(
    auth!.revenue?.current || 0
  );

  const currentRevenueInThousands = handleValue(
    Utils.Intl.Number.formatToThousands(auth!.revenue.current),
    hideValue
  );
  const totalRevenueInThousands = handleValue(
    Utils.Intl.Number.formatToThousands(auth!.revenue.total),
    hideValue
  );

  const currentProgress = `${getProgress(auth!.revenue)}%`;
  const currentRevenue = `${currentRevenueInThousands} / ${totalRevenueInThousands}`;

  const eyeIcon = hideValue ? <Image.Eye.Close /> : <Image.Eye.Open />;

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      isLoading={!auth || !isReady || financial.isFetching}
    >
      <View style={{ gap: theme.spacing.xxs }}>
        <View
          style={{
            marginTop: theme.spacing.base,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.base,
            }}
          >
            <Avatar uri={auth?.user.picture} fallback={auth?.user.firstName} />
            <Text.Base
              style={{
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
                lineHeight: 17,
              }}
            >
              {t(Texts.welcome, { name: auth?.user.firstName || "" })}
            </Text.Base>
          </View>
          <View style={{ flexDirection: "row", gap: theme.spacing.nano }}>
            <Pressable
              onPress={toggleHideValue}
              style={{ justifyContent: "center" }}
            >
              {eyeIcon}
            </Pressable>
            <Pressable onPress={() => Alert.alert("notification")} style={{}}>
              <Image.Notification />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.color.secondary.normal,
            padding: theme.spacing.xxs,
            gap: theme.spacing.xxxs,
            borderRadius: theme.borderRadius.base,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExtractHome", {
                totalBalance: totalValue,
              })
            }
          >
            <Flex
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ gap: theme.spacing.nano }}>
                <Text.Base
                  style={{
                    fontSize: theme.font.size.xxs,
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                  }}
                >
                  {Texts.totalBalance}
                </Text.Base>
                <Text.Base
                  style={{ fontSize: theme.font.size.xl, letterSpacing: 4 }}
                >
                  {handleValue(totalValue, hideValue)}
                </Text.Base>
              </View>
              <Image.Chevron.RightLarge />
            </Flex>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", gap: theme.spacing.nano }}>
            <TouchableOpacity
              style={{
                paddingVertical: theme.spacing.nano,
                paddingHorizontal: theme.spacing.base,
                borderRadius: theme.borderRadius.pill,
                gap: theme.spacing.nano,
                backgroundColor: theme.color.white["024"],
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("PixHome")}
            >
              <Image.Pix.Icon />
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxs,
                  fontWeight: theme.font.weight.regular,
                  fontFamily: theme.font.family.regular,
                }}
              >
                {Texts.buttons.pix}
              </Text.Base>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            backgroundColor: theme.color.white["012"],
            padding: theme.spacing.xxxs,
            gap: theme.spacing.base,
            borderRadius: theme.borderRadius.base,
          }}
        >
          <Text.Base>{Texts.revenue}</Text.Base>
          <Text.Base
            style={{
              fontWeight: theme.font.weight.regular,
              fontFamily: theme.font.family.regular,
            }}
          >
            {currentRevenue}
          </Text.Base>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.nano,
            }}
          >
            <View
              style={{
                backgroundColor: theme.color.white["020"],
                height: theme.size.quarck,
                flex: 1,
                borderRadius: theme.borderRadius.pill,
              }}
            >
              <View
                style={{
                  height: theme.size.quarck,
                  width: currentProgress as DimensionValue,
                  backgroundColor: theme.color.secondary.normal,
                  borderRadius: theme.borderRadius.base,
                }}
              />
            </View>
            <Text.Base
              style={{
                fontSize: theme.font.size.xxxs,
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
              }}
            >
              {handleValue(currentProgress, hideValue).slice(0, 2)}
            </Text.Base>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: theme.spacing.xxxs }}>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.color.white["012"],
              padding: theme.spacing.xxxs,
              gap: theme.spacing.base,
              borderRadius: theme.borderRadius.base,
            }}
          >
            <Text.Base
              style={{
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
                fontSize: theme.font.size.xxs,
              }}
            >
              {Texts.availableBalance}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.md,
              }}
            >
              {handleValue(financial.balance, hideValue)}
            </Text.Base>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: theme.color.white["012"],
              padding: theme.spacing.xxxs,
              gap: theme.spacing.base,
              borderRadius: theme.borderRadius.base,
            }}
          >
            <Text.Base
              style={{
                fontWeight: theme.font.weight.regular,
                fontFamily: theme.font.family.regular,
                fontSize: theme.font.size.xxs,
              }}
            >
              {Texts.pendingBalance}
            </Text.Base>
            <Text.Base
              style={{
                fontSize: theme.font.size.md,
              }}
            >
              {handleValue(financial.pending, hideValue)}
            </Text.Base>
          </View>
        </View>
      </View>

      <View style={{ gap: theme.spacing.xxxs }}>
        <Button.Base
          variant="unfilled"
          onPress={() => {
            navigation.navigate("RegisterHome");
          }}
          title="Cadastro"
        />
        <Button.Base
          variant="unfilled"
          onPress={() => {
            handleLogout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          }}
          title="Sair"
        />
      </View>
    </Template.Base>
  );
}
