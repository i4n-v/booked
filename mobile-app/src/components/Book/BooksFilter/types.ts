import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { MutableRefObject } from "react";
import { Control, UseFormSetValue } from "react-hook-form";

export interface BooksFilterProps {
  handleOpenFilter(): void;
  refFilter: MutableRefObject<BottomSheetModalMethods | null>;
  filterFormControl: Control<any, any>;
  setValue?: UseFormSetValue<any>;
  removePriceFilter?: boolean
}
