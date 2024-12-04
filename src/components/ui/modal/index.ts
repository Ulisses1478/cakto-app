import { Loading } from "./loading";
import { BottomSheet, BottomSheetProps, BottomSheetRef } from "./bottom-sheet";

export const Modal = Object.freeze({ Loading, BottomSheet });

export interface ModalProps {
  BottomSheet: {
    props: BottomSheetProps;
    ref: BottomSheetRef;
  };
}
