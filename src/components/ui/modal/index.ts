import { BottomSheet, BottomSheetProps, BottomSheetRef } from "./bottom-sheet";
import { EditInfo, EditInfoProps, EditInfoRef } from "./edit-info";
import { Loading } from "./loading";

export const Modal = Object.freeze({ Loading, BottomSheet, EditInfo });

export interface ModalProps {
  BottomSheet: {
    props: BottomSheetProps;
    ref: BottomSheetRef;
  };
  EditInfo: {
    props: EditInfoProps;
    ref: EditInfoRef;
  };
}
