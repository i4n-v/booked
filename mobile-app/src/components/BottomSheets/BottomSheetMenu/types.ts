import { IIconButtonProps } from "@/components/Buttons/IconButton/types";
import { ExpoVectorIcon } from "@/types/ExpoVectorIcons";

type IMenuIcon<T extends ExpoVectorIcon> = Pick<IIconButtonProps<T>, "name" | "icon">;

interface IMenuItem<T extends ExpoVectorIcon> extends IMenuIcon<T> {
  text: string;
  disabled?: boolean;
  onPress?(item: IMenuItem<T>): void;
}

interface IBottomSheetMenuProps<T extends ExpoVectorIcon> {
  items: IMenuItem<T>[];
  onOpen?(): void;
  onClose?(): void;
}

export { IBottomSheetMenuProps };
