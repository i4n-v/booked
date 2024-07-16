import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";
import { ReactNode } from "react";

interface ISwipleableActions<T> {
  name: string;
  confirm?: boolean;
  onPress?(data: T): void;
}

interface ICustomSwipleableActionsPattern<I extends ExpoVectorIcon> {
  title: string;
  name: keyof I["glyphMap"];
  icon: I;
  color: string;
  confirm?: boolean;
}

type ICustomSwipleableActions<I extends ExpoVectorIcon> = Record<
  string,
  ICustomSwipleableActionsPattern<I>
>;

interface ISwipeableProps<T, I extends ExpoVectorIcon> {
  data: T;
  actions: ISwipleableActions<T>[];
  customActions?: ICustomSwipleableActions<I>;
  disabledActions?(data: T, action: string): boolean;
  itemKeyExtractor?: keyof T & string;
  confirmMessage?: string;
  children: ReactNode;
}

interface ActionAlert {
  message: string;
  onPress(): void;
}

export { ISwipeableProps, ICustomSwipleableActions, ActionAlert };
