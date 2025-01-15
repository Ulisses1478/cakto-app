import dayjs from "dayjs";
import React, { useState } from "react";
import { View } from "react-native";
import DTPicker, { DateType } from "react-native-ui-datepicker";

import "dayjs/locale/pt-br";
import { Button, Text, TextProps } from "@/components/ui";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

interface RangeDateProps {
  startDate: DateType;
  endDate: DateType;
}

interface DatePickerProps {
  handleConfirm: (dates: RangeDateProps) => void;
  currentDates: RangeDateProps;
}

export function DatePicker(props: DatePickerProps) {
  const { handleConfirm, currentDates } = props;
  const [rangeDate, setRangeDate] = useState(currentDates);

  return (
    <View
      style={{
        backgroundColor: theme.color.gray["900"],
        borderRadius: theme.borderRadius.sm,
        alignItems: "center",
        flex: 1,
        width: "100%",
      }}
    >
      <DTPicker
        locale="pt-br"
        mode="range"
        todayTextStyle={{
          color: theme.color.secondary.bright,
          fontWeight: theme.font.weight.bold,
          fontFamily: theme.font.family.bold,
          fontSize: theme.font.size.xxs,
        }}
        maxDate={dayjs()}
        startDate={rangeDate.startDate}
        endDate={rangeDate.endDate}
        onChange={(params) => {
          if (params.startDate && params.endDate) {
            const start = dayjs(params.startDate);
            const end = dayjs(params.endDate);

            if (start.isSame(end, "day")) {
              setRangeDate({} as RangeDateProps);
              return;
            }
          }
          setRangeDate(params as RangeDateProps);
        }}
        dates={[rangeDate.startDate, rangeDate.endDate]}
        headerButtonColor={theme.color.white["100"]}
        selectedItemColor={theme.color.secondary.bright}
        selectedTextStyle={{
          fontWeight: theme.font.weight.bold,
          fontFamily: theme.font.family.bold,
          color: theme.color.gray["900"],
          fontSize: theme.font.size.xxxs,
        }}
        selectedRangeBackgroundColor={theme.color.secondary.dark}
        weekDaysTextStyle={{
          color: theme.color.gray["500"],
          fontWeight: theme.font.weight.medium,
          fontFamily: theme.font.family.medium,
          fontSize: theme.font.size.xxs,
        }}
        calendarTextStyle={{
          color: theme.color.white["100"],
          fontWeight: theme.font.weight.medium,
          fontFamily: theme.font.family.medium,
        }}
        headerTextStyle={{
          color: theme.color.white["100"],
          fontWeight: theme.font.weight.bold,
          fontFamily: theme.font.family.bold,
          fontSize: theme.font.size.xxs,
        }}
        headerButtonsPosition="right"
        headerButtonStyle={{
          borderWidth: theme.borderWidth.hairline,
          borderColor: theme.color.white["100"],
          borderRadius: theme.borderRadius.pill,
        }}
        displayFullDays
        monthContainerStyle={{
          backgroundColor: theme.color.gray["900"],
        }}
        yearContainerStyle={{
          backgroundColor: theme.color.gray["900"],
        }}
        todayContainerStyle={{
          borderRadius: theme.borderRadius.xs,
        }}
      />
      <Button.Base
        title="Confirmar"
        style={{
          backgroundColor: theme.color.secondary.normal,
          marginBottom: 24,
        }}
        onPress={() => handleConfirm(rangeDate)}
      />
    </View>
  );
}

function BaseDateRangeText(props: TextProps["Base"]) {
  return (
    <Text.Base
      style={{
        fontSize: theme.font.size.xxs,
        fontWeight: theme.font.weight.medium,
        fontFamily: theme.font.family.medium,
      }}
      {...props}
    />
  );
}

const t = Utils.Constants.Text.t;
const Texts = Utils.Constants.Text.authenticated.extract;

export function DateRange(props: RangeDateProps) {
  const { startDate, endDate } = props;
  return (
    <>
      {startDate && endDate ? (
        <BaseDateRangeText>
          {t(Texts.home.filter.result.range, {
            from: String(
              Utils.Intl.DateHelper.getLocaleDateString(String(startDate))
            ),
            to: String(
              Utils.Intl.DateHelper.getLocaleDateString(String(endDate))
            ),
          })}
        </BaseDateRangeText>
      ) : (
        <BaseDateRangeText>
          {t(Texts.home.filter.result.singleDate, {
            from: String(
              Utils.Intl.DateHelper.getLocaleDateString(
                String(startDate || endDate)
              )
            ),
          })}
        </BaseDateRangeText>
      )}
    </>
  );
}
