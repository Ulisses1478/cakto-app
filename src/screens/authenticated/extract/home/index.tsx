import React, { useEffect, useRef, useState } from "react";
import { View, FlatList } from "react-native";
import { DateType } from "react-native-ui-datepicker";

import { DatePicker, DateRange } from "./date-picker";
import { DetailCardProps, Details } from "./detail-card";
import { FilterOptionCard } from "./filter-option-card";
import { RangeButton } from "./range-button";

import { Image } from "@/assets/images";
import { Flex, Modal, ModalProps, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { Service } from "@/services";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.extract;

const options_first_row = [
  {
    label: Texts.home.filter.options.receive,
    icon: <Image.Pix.Receive />,
    route: "",
  },
  {
    label: Texts.home.filter.options.pay,
    icon: <Image.Pix.Send />,
    route: "",
  },
  {
    label: Texts.home.filter.options.automaticDebit,
    icon: <Image.Extract.AutomaticDebit />,
    route: "",
  },
  {
    label: Texts.home.filter.options.transfer,
    icon: <Image.Extract.Transfer />,
    route: "",
  },
];

function getDaysAgo(days: number) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

const range_options = [
  { text: Texts.home.filter.range.options.total, value: 0, date: null },
  {
    text: Texts.home.filter.range.options.sevenDays,
    value: 7,
    date: getDaysAgo(7),
  },
  {
    text: Texts.home.filter.range.options.fifteenDays,
    value: 15,
    date: getDaysAgo(15),
  },
  {
    text: Texts.home.filter.range.options.thirtyDays,
    value: 30,
    date: getDaysAgo(30),
  },
  { text: Texts.home.filter.range.options.other, value: -1, date: null },
];

interface RangeDateProps {
  startDate: DateType;
  endDate: DateType;
}

export function Home({ navigation, route }: RouteStackParams<"ExtractHome">) {
  const { totalBalance } = route.params;

  const [list, setList] = useState<DetailCardProps[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
  });
  const [selectedRange, setSelectedRange] = useState(range_options[0]);
  const [loading, setLoading] = useState(true);
  const [rangeDate, setRangeDate] = useState({} as RangeDateProps);
  const modalRef = useRef<ModalProps["CustomBottomSheet"]["ref"]>(null);

  function handlePage() {
    const newPage = pagination.page + 1;
    setPagination({
      ...pagination,
      page: newPage,
    });

    getExtract({ page: newPage, size: pagination.size });
  }

  async function getExtract(params = { page: 1, size: 10 }) {
    setLoading(true);
    const response = await Service.Extract.get(params);
    const currentList = [...list, ...response.data];
    setList(currentList as DetailCardProps[]);
    setLoading(false);
  }

  useEffect(() => {
    if (!list.length) {
      getExtract(pagination);
    }
  }, []);

  return (
    <Template.Base
      style={{
        paddingHorizontal: 0,
      }}
      isLoading={loading}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
      asBackgroundImage={{
        source: "home",
      }}
    >
      <Modal.CustomBottomSheet ref={modalRef} />

      <FlatList
        data={[1]}
        onEndReached={() => handlePage()}
        renderItem={() => (
          <View style={{ gap: theme.spacing.xs }}>
            <View
              style={{
                gap: theme.spacing.nano,
                paddingHorizontal: theme.spacing.xxs,
                marginTop: BACK_BUTTON_HEIGHT,
              }}
            >
              <Text.Base
                style={{
                  fontSize: theme.font.size.xxs,
                  fontWeight: theme.font.weight.medium,
                  fontFamily: theme.font.family.medium,
                }}
              >
                {Texts.home.title}
              </Text.Base>
              <Text.Base
                style={{
                  fontSize: theme.font.size.md,
                  lineHeight: 20,
                  letterSpacing: 1,
                }}
              >
                {totalBalance}
              </Text.Base>
            </View>

            <Flex
              style={{
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingHorizontal: theme.spacing.xxs,
              }}
            >
              {options_first_row.map((option, index) => {
                return (
                  <FilterOptionCard
                    key={index}
                    index={index}
                    {...option}
                    onPress={() => {}}
                  />
                );
              })}
            </Flex>

            <View
              style={{
                borderWidth: theme.borderWidth.hairline,
                borderColor: theme.color.white["024"],
              }}
            />
            <View
              style={{
                gap: theme.spacing.xxs,
                paddingHorizontal: theme.spacing.xxs,
              }}
            >
              <View style={{ gap: theme.spacing.xxxs }}>
                <Text.Base
                  style={{
                    fontSize: theme.font.size.xxs,
                    fontWeight: theme.font.weight.medium,
                    fontFamily: theme.font.family.medium,
                  }}
                >
                  {Texts.home.filter.range.title}
                </Text.Base>
                <Flex
                  style={{
                    borderWidth: theme.borderWidth.hairline,
                    borderColor: theme.color.white["100"],
                    borderRadius: theme.borderRadius.sm,
                  }}
                >
                  {range_options.map((option, index) => (
                    <RangeButton
                      key={index}
                      {...option}
                      isFirst={index === 0}
                      isLast={index === range_options.length - 1}
                      isSelected={selectedRange.text === option.text}
                      onPress={() => {
                        setSelectedRange(option);
                        if (option.value === -1) {
                          modalRef.current?.onOpen({
                            children: (
                              <DatePicker
                                handleConfirm={(
                                  currentDates: RangeDateProps
                                ) => {
                                  setRangeDate(currentDates);
                                  modalRef.current?.onClose();
                                }}
                                currentDates={rangeDate}
                              />
                            ),
                          });
                        }
                      }}
                    />
                  ))}
                </Flex>
                {selectedRange.value >= 7 &&
                  selectedRange.value <= 30 &&
                  !!selectedRange.date && (
                    <DateRange
                      startDate={selectedRange.date}
                      endDate={new Date()}
                    />
                  )}

                {selectedRange.value === -1 &&
                  !!(rangeDate.startDate || rangeDate.endDate) && (
                    <DateRange {...rangeDate} />
                  )}

                <View style={{ gap: theme.spacing.xxxs }}>
                  {list.map((operation, index) => {
                    // @ts-ignore
                    return <Details key={index} {...operation} />;
                  })}
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </Template.Base>
  );
}
