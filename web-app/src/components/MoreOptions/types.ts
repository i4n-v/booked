import { DropdownOptions } from "../Dropdown/type"

export type MoreOptionsProps = {
    open: boolean,
    handleOpen: React.Dispatch<React.SetStateAction<boolean>>,
    options: DropdownOptions[],
    id: string,

}