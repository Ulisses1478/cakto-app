import { CommonActions } from "@react-navigation/native";
import {
  CameraView,
  useCameraPermissions,
  PermissionStatus,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Linking, StyleSheet, View } from "react-native";
import Svg, { Rect, Defs, Mask } from "react-native-svg";

import { Button, Modal, ModalProps, Template, Text } from "@/components/ui";
import { BACK_BUTTON_HEIGHT } from "@/components/ui/templates/base-screen";
import { RouteStackParams } from "@/navigation/routes";
import { theme } from "@/styles/theme";
import { Utils } from "@/utils";

const Texts = Utils.Constants.Text.authenticated.pix.send.qrcode;

const mock_pix_key = "29d2fdda-76b8-4cd4-820e-39b50103a1f4";

const feedbackWarningProps = {
  title: Texts.warning.title,
  description: Texts.warning.description,
  onSubmitText: Texts.warning.onSubmitText,
  onCancelText: Texts.warning.onCancelText,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

const feedbackInvalidQRCodeProps = {
  title: Texts.invalid.title,
  description: Texts.invalid.description,
  onSubmitText: Texts.invalid.onSubmitText,
  scheme: "warning",
} as ModalProps["BottomSheet"]["props"];

let timeout: any = null;

export function ReadQRCode({ navigation }: RouteStackParams<"PixSend">) {
  const [permission, requestPermission] = useCameraPermissions();
  const getQRCodeData = useRef(false);
  const invalidQRCodeData = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<ModalProps["BottomSheet"]["ref"]>(null);

  useEffect(() => {
    timeout = setTimeout(() => {
      if (!getQRCodeData.current) {
        modalRef.current?.onOpen({
          ...feedbackWarningProps,
          onSubmit: () => {
            modalRef.current?.onClose();
          },
          onCancel: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: "Home" },
                  { name: "PixHome" },
                  { name: "PixSendCopyAndPaste" },
                ],
              })
            );
            modalRef.current?.onClose();
          },
          onClose: () => {
            getQRCodeData.current = false;
            setShowModal(!showModal);
          },
        });
      }
    }, 15 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [showModal]);

  if (!permission) {
    return <Modal.Loading fullScreen />;
  }

  function handleSubmit(data: string) {
    if (!data) return;
    if (getQRCodeData.current) return;
    getQRCodeData.current = true;
    if (!data.includes("GOV")) {
      invalidQRCodeData.current = true;
      modalRef.current?.onOpen({
        ...feedbackInvalidQRCodeProps,
        onSubmit: () => {
          modalRef.current?.onClose();
        },
        onClose: () => {
          navigation.goBack();
        },
      });
      return;
    }

    // TODO: Ao integrar com backend, preciso enviar a instituição financeira e demais dados como valor, etc...
    const mock_value = Math.floor(Math.random() * 10);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Home" },
          { name: "PixHome" },
          {
            name: "PixSendConfirmation",
            params: {
              pixKey: mock_pix_key,
              value: mock_value,
              canEditFromAutomaticSource: mock_value === 0,
              bankAccount: { id: "1", name: "Cakto" },
              fromAutomaticSource: true,
            },
          },
        ],
      })
    );
  }

  const { width, height } = Dimensions.get("window");
  const boxSize = 250;

  if (permission.status === PermissionStatus.GRANTED) {
    return (
      <View style={{ flex: 1, position: "relative", backgroundColor: "black" }}>
        <Modal.BottomSheet ref={modalRef} />
        <Button.Back
          onPress={() => navigation.goBack()}
          style={{
            marginTop: BACK_BUTTON_HEIGHT,
            marginLeft: theme.spacing.xxs,
            position: "absolute",
          }}
        />
        <View
          style={{
            position: "absolute",
            marginTop: BACK_BUTTON_HEIGHT * 3,
            marginLeft: theme.spacing.xxs,
            zIndex: 20,
          }}
        >
          <Text.Base
            style={{
              position: "absolute",
              fontSize: theme.font.size.xxs,
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            {Texts.title}
          </Text.Base>
        </View>
        <CameraView
          style={{ flex: 1 }}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={({ data }) => handleSubmit(data)}
        >
          <View style={StyleSheet.absoluteFillObject}>
            <Svg height={height} width={width}>
              <Defs>
                <Mask id="mask" x="0" y="0" width={width} height={height}>
                  <Rect
                    x="0"
                    y="0"
                    width={width}
                    height={height}
                    fill="white"
                  />
                  <Rect
                    x={(width - boxSize) / 2}
                    y={(height - boxSize) / 2}
                    width={boxSize}
                    height={boxSize}
                    fill="black"
                  />
                </Mask>
              </Defs>
              <Rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill="rgba(0, 0, 0, 0.5)"
                mask="url(#mask)"
              />
            </Svg>
            <View
              style={{
                position: "absolute",
                width: boxSize,
                height: boxSize,
                borderWidth: 2,
                borderColor: theme.color.secondary.normal,
                zIndex: 1,
                top: (height - boxSize) / 2,
                left: (width - boxSize) / 2,
              }}
            />
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <Template.Base
      asBackgroundImage={{
        source: "home",
      }}
      canGoBack={navigation.canGoBack()}
      goBack={() => navigation.goBack()}
      scrollViewProps={{
        wrapWithScrollView: true,
      }}
    >
      <View
        style={{
          gap: theme.spacing.xxxs,
          marginTop: BACK_BUTTON_HEIGHT,
          flex: 1,
          width: theme.size.full,
        }}
      >
        {!permission?.granted && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: theme.spacing.base,
            }}
          >
            <Text.Base>{Texts.requestPermissionTitle}</Text.Base>
            <Button.Base
              title={Texts.buttons.grantPermission}
              style={{ backgroundColor: theme.color.secondary.normal }}
              onPress={() => {
                if (permission.status === PermissionStatus.DENIED) {
                  Linking.openSettings();
                } else {
                  requestPermission();
                }
              }}
            />
          </View>
        )}
      </View>
    </Template.Base>
  );
}
