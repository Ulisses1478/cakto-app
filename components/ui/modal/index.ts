import { Loading } from "./loading";
import { BottomSheet, BottomSheetProps } from "./bottom-sheet";

export const Modal = Object.freeze({ Loading, BottomSheet });

export interface ModalProps {
  BottomSheet: BottomSheetProps;
}
