import { IWrapper } from "../../../commons/IWrapper";

export type InputSelectProps<T> = {
    name: string;
    options?: T[];
    optionLabel: keyof T;
    label?: string;
    multiple?: boolean;
    service?: (...args: any) => Promise<IWrapper<T>> 
}