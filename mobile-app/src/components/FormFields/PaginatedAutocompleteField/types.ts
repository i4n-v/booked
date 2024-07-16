import { IAutocompleteProps } from "../AutocompleteField/types";

interface IServiceParams {
  page: number;
  limit: number;
  [key: string]: string | number | null;
}

interface IServiceResponse<T> {
  total: number;
  items: T[];
}

interface IPaginatedAutocomplete<T> extends Omit<IAutocompleteProps<T>, "options"> {
  service(params: IServiceParams): Promise<IServiceResponse<T>>;
  refetchService?: Array<any>;
  limit?: number;
  filterKey?: string;
  queryKey: string;
  onChangeText?(value: string | null): void;
}

export { IPaginatedAutocomplete };
