import { BottomSheet, BottomSheetProps, BottomSheetRef } from "./bottom-sheet";
import {
  CustomBottomSheet,
  CustomBottomSheetProps,
  CustomBottomSheetRef,
} from "./custom-bottom-sheet";
import { EditInfo, EditInfoProps, EditInfoRef } from "./edit-info";
import { Loading } from "./loading";

export const Modal = Object.freeze({
  Loading,
  BottomSheet,
  EditInfo,
  CustomBottomSheet,
});

export interface ModalProps {
  BottomSheet: {
    props: BottomSheetProps;
    ref: BottomSheetRef;
  };
  CustomBottomSheet: {
    props: CustomBottomSheetProps;
    ref: CustomBottomSheetRef;
  };
  EditInfo: {
    props: EditInfoProps;
    ref: EditInfoRef;
  };
}
