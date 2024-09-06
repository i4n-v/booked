import { Params } from "@/types/Params";
import { IAutocompleteProps } from "../AutocompleteField/types";
import { IWrapper } from "@/types/Wrapper";

interface IServiceParams extends Params {
  page: number;
  limit: number;
}
interface IPaginatedAutocomplete<T> extends Omit<IAutocompleteProps<T>, "options"> {
  service(params: IServiceParams): Promise<IWrapper<T>>;
  refetchService?: Array<any>;
  limit?: number;
  filterKey?: string;
  queryKey: string;
  onChangeText?(value: string | null): void;
}

export { IPaginatedAutocomplete };
