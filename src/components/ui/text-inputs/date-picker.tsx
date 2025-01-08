import DatetimePicker, {
  DateTimePickerEvent,
  BaseProps,
} from "@react-native-community/datetimepicker";
import { forwardRef, useRef, useState } from "react";
import {
  View,
  TextStyle,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
} from "react-native";

import { Button } from "../buttons";
import { Flex } from "../flex";
import { Text } from "../texts";

import { theme } from "@/styles/theme";

interface TextInputProps extends Omit<BaseProps, "value"> {
  label?: string;
  style?: TextStyle;
  textProps?: TextStyle;
  disabled?: boolean;
  value?: Date;
}

function dynamicStyles(isFocused: boolean) {
  if (isFocused) {
    return {
      style: {
        borderColor: theme.color.white[100],
      },
    };
  }

  return {
    style: {
      borderColor: theme.color.white["064"],
    },
  };
}

function DatePickerBase(props: TextInputProps, ref: any) {
  const {
    label,
    textProps,
    disabled = false,
    value = new Date(),
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [date, setDate] = useState(value);
  const [displayDate, setDisplayDate] = useState(
    value.toLocaleDateString("pt-BR")
  );
  const lastDate = useRef(value);
  const { style: inputStyle } = dynamicStyles(isFocused);

  function handleInputFocus(focus: boolean) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsFocused(focus);
  }

  function onChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (!selectedDate) return;
    if (event.type === "set") {
      setDate(selectedDate);
      if (Platform.OS === "android") {
        lastDate.current = selectedDate;
        setDisplayDate(selectedDate.toLocaleDateString("pt-BR"));
      }
    } else {
      handleInputFocus(false);
    }
  }

  function onCancelIOS() {
    setDate(lastDate.current);
    console.log(lastDate.current);
    handleInputFocus(false);
  }

  function onChangeIOS(value: Date) {
    lastDate.current = value;
    setDisplayDate(value.toLocaleDateString("pt-BR"));
    handleInputFocus(false);
  }

  return (
    <View
      style={{
        gap: theme.spacing.quarck,
      }}
    >
      {label && (
        <Text.Base style={{ fontSize: theme.font.size.xxs, ...textProps }}>
          {label}
        </Text.Base>
      )}
      {!isFocused && (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => handleInputFocus(true)}
          style={{
            borderWidth: theme.borderWidth.hairline,
            borderRadius: theme.borderRadius.sm,
            height: theme.size.lg,
            width: theme.size.full,
            paddingLeft: theme.spacing.xxxs,
            paddingRight: theme.spacing.xxxs,
            ...inputStyle,
            justifyContent: "center",
          }}
        >
          <Text.Base
            style={{
              fontFamily: theme.font.family.medium,
              fontWeight: theme.font.weight.medium,
              fontSize: theme.font.size.xxs,
              color: theme.color.white["100"],
            }}
          >
            {displayDate}
          </Text.Base>
        </TouchableOpacity>
      )}
      {isFocused && (
        <View>
          <DatetimePicker
            disabled={disabled}
            value={date}
            mode="date"
            themeVariant="light"
            display="spinner"
            style={{
              backgroundColor: theme.color.gray[900],
            }}
            textColor="white"
            accentColor={theme.color.secondary.normal}
            locale="pt-BR"
            maximumDate={new Date()}
            onChange={onChange}
            {...rest}
          />
          {Platform.OS === "ios" && (
            <Flex style={{ gap: theme.spacing.xxxs, width: theme.size.full }}>
              <Button.Base
                variant="unfilled"
                title="Cancelar"
                style={{ width: "45%" }}
                onPress={onCancelIOS}
              />
              <Button.Base
                variant="filled"
                style={{
                  backgroundColor: theme.color.secondary.normal,
                  width: "45%",
                }}
                title="Confirmar"
                onPress={() => onChangeIOS(date)}
              />
            </Flex>
          )}
        </View>
      )}
    </View>
  );
}

export const DatePicker = forwardRef(DatePickerBase);
